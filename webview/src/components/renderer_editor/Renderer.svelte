<div id="container" bind:this={myContainer}>
  <svg
    version="2.0"
    viewbox="
      {(camera.x - camera.width) / 2 / camera.scale}
      {(camera.y - camera.height) / 2 / camera.scale}
      {camera.width}
      {camera.height}
    "
  >
    <defs>
      <clipPath id="spriteClip" clipPathUnits="objectBoundingBox">
        <rect x="{(spr.idx % spr.frameCount) / spr.frameCount}" y="0" width="{1 / spr.frameCount}" height="1" />
      </clipPath>
      {#each hitboxData as hitbox, i}
        {#if (hitbox.type === 2 && hitbox.imageData !== undefined)}
          <clipPath id="projClip-{i}" clipPathUnits="objectBoundingBox">
            <rect x="{(hitbox.imageIdx % hitbox.imageFrameCount) / hitbox.imageFrameCount}" y="0" width="{1 / hitbox.imageFrameCount}" height="1" />
          </clipPath>
        {/if}
      {/each}
      <marker id="head" orient="auto" markerWidth="2" markerHeight="4"
              refX="0.1" refY="2">
        <path d="M0,0 V4 L2,2 Z" fill="#000"/>
      </marker>
    </defs>
    <!-- axis -->
    <path
      d="
        M {-4 * camera.width / 2} 0
        h {camera.width * 4}
      "
      stroke-width="{2 / camera.scale}"
      stroke="#000F"
      shape-rendering="crispEdges"
    />
    <path
      d="
        M 0 {-4 * camera.height / 2}
        v {camera.height * 4}
      "
      stroke-width="{2 / camera.scale}"
      stroke="#000F"
      shape-rendering="crispEdges"
    />
    <!-- image -->
    <image
      x="{0 - spr.offsets.x - ((spr.idx % spr.frameCount) / spr.frameCount) * spr.data.width + frameData.xOffset}"
      y="{0 - spr.offsets.y + frameData.yOffset}"
      width="{spr.data.width}"
      height="{spr.data.height}"
      xlink:href="{spr.data.src}"
      clip-path="url(#spriteClip)"
    />
    <!-- hurtbox -->
    {#if ($showHurtbox && hurt.data) }
      <image
        x="{0 - hurt.offsets.x - ((hurt.idx % hurt.frameCount) / hurt.frameCount) * hurt.data.width + frameData.xOffset}"
        y="{0 - hurt.offsets.y + frameData.yOffset}"
        width="{hurt.data.width}"
        height="{hurt.data.height}"
        xlink:href="{hurt.data.src}"
        clip-path="url(#spriteClip)"
        style="opacity: {$hurtboxOpacity}"
      />
    {/if}
    <!-- hitboxes -->
    {#if $showHitboxes}
      {#each hitboxData as hitbox, i}
        <!-- hitboxes -->
        {#if (hitbox.type === 1 || hitbox.imageData === undefined)}
          <!-- regular hitboxes -->
          {#if hitbox.shape === 0}
            <ellipse
              on:click={() => selectedHitbox.set(hitbox)}
              class="hitbox"
              data-index={i}
              cx="{hitbox.xPos + hitbox._xOffset}"
              cy="{hitbox.yPos + hitbox._yOffset}"
              rx="{hitbox.width / 2}"
              ry="{hitbox.height / 2}"
              fill="{hitbox === selectedHitbox ? '#cc08' : '#c008'}"
            />
          {:else if hitbox.shape === 1}
            <rect
              on:click={() => selectedHitbox.set(hitbox)}
              class="hitbox"
              data-index={i}
              x="{hitbox.xPos + hitbox._xOffset}"
              y="{hitbox.yPos + hitbox._yOffset}"
              width="{hitbox.width}"
              height="{hitbox.height}"
              fill="{hitbox === selectedHitbox ? '#cc08' : '#c008'}"
            />
          {:else}
            <rect
              on:click={() => selectedHitbox.set(hitbox)}
              class="hitbox"
              data-index={i}
              x="{hitbox.xPos + hitbox._xOffset}"
              y="{hitbox.yPos + hitbox._yOffset}"
              rx="{hitbox.width * 0.25}"
              ry="{hitbox.height * 0.25}"
              width="{hitbox.width}"
              height="{hitbox.height}"
              fill="{hitbox === selectedHitbox ? '#cc08' : '#c008'}"
            />
          {/if}
        {:else}
          <!-- projectiles -->
          <image
            on:click={() => selectedHitbox.set(hitbox)}
            x="{hitbox.xPos + hitbox._xOffset - ((hitbox.imageIdx % hitbox.imageFrameCount) / hitbox.imageFrameCount) * hitbox.imageData.width}"
            y="{hitbox.yPos + hitbox._yOffset}"
            width="{hitbox.imageData.width}"
            height="{hitbox.imageData.height}"
            xlink:href="{hitbox.imageData.src}"
            clip-path="url(#projClip-{i})"
          />
        {/if}
      {/each}
    {/if}
    <!-- angles -->
    {#if $showAngle}
      {#each hitboxData as hitbox}
        <path
          d="M {hitbox.xPos + hitbox._xOffset + (hitbox.imageOffsetX || 0)/2} {hitbox.yPos + hitbox._yOffset + (hitbox.imageOffsetY || 0)/2} l {Math.cos(hitbox.angleRad) * hitbox.knockback * 5} {Math.sin(hitbox.angleRad) * -1 * hitbox.knockback * 5}"
          stroke-width="5"
          stroke="#000"
          marker-end="url(#head)"
        />
        <path
          d="M {hitbox.xPos + hitbox._xOffset + (hitbox.imageOffsetX || 0)/2} {hitbox.yPos + hitbox._yOffset + (hitbox.imageOffsetY || 0)/2} l {Math.cos(hitbox.angleRad) * (hitbox.knockback + 1) * 5} {Math.sin(hitbox.angleRad) * -1 * (hitbox.knockback + 1) * 5}"
          stroke-width="2"
          stroke="#fff"
        />
      {/each}
    {/if}
    <!-- guideline -->
    {#if $selectedHitbox._idx !== -1 && $showGuideline}
      <path
        d={selectedHitboxPaths[0]}
        stroke-width="5"
        stroke={'#f00'}
        style="pointer-events: none"
        fill="transparent"
      />
      <path
        d={selectedHitboxPaths[1]}
        stroke-width="5"
        stroke={'#99f'}
        style="pointer-events: none"
        fill="transparent"
      />
    {/if}
  </svg>
</div>

<script>
  import { spriteData, soundSources } from '../../store/user_data_store.js';
  import { currentFrame } from '../../store/windows_editor.js';
  import { timeline } from '../../store/gameState_editor.js';
  import {
    targetAttributes,
    showHitboxes,
    showAngle,
    showGuideline,
    guidelineLength,
    selectedHitbox,
    showHurtbox,
    hurtboxOpacity
  } from '../../store/renderOptions.js';
  import { onMount, onDestroy } from 'svelte';

  let myContainer;
  let camera = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scale: 1,
  }
  let frameData;
  let hitboxData;
  let spr = {
    data: undefined,
    idx: undefined,
    offsets: undefined,
    frameCount: undefined,
    frameWidth: undefined
  };
  let hurt = {
    data: undefined,
    idx: undefined,
    offsets: undefined,
    frameCount: undefined,
    frameWidth: undefined
  };

  let selectedHitboxPaths = undefined;

  const calcKnockback = ({knockback, knockbackScaling, angleRad}, {damage, knockback_adj}) => {
    const overall = knockback + damage * knockbackScaling * 0.12 * knockback_adj;
    return {
      x: Math.cos(angleRad) * overall,
      y: Math.sin(angleRad) * overall * -1
    }
  };
  const calcHitstun = ({knockback, knockbackScaling}, {damage, knockback_adj}) => {
    return knockback * 4 * ((knockback_adj - 1) * 0.6 + 1) + damage * 0.12 * knockbackScaling * 4 * 0.65 * knockback_adj
  }
  const calcHitpause = ({hitpause, hitpauseScaling}, {damage}) => {
    return hitpause + damage * hitpauseScaling * .05
  }
  const approach = (start, end, shift) => {
    if (start < end) return Math.min(start + shift, end)
    else return Math.max(start - shift, end)
  }
  const calcKnockbackPaths = (hitbox, props) => {
    const hitstun = Math.round(calcHitstun(hitbox, props));
    let {x: hsp, y: vsp} = calcKnockback(hitbox, props);
    let x = hitbox.xPos + hitbox._xOffset + (hitbox.imageOffsetX || 0) / 2;
    let y = hitbox.yPos + hitbox._yOffset + (hitbox.imageOffsetY || 0) / 2;
    let hitstunPath = `M ${x} ${y} `
    let fallPath = ``;
    for (let i = 0; i < $guidelineLength; i++) {
      hsp = approach(hsp, 0, props.air_friction)
      vsp = Math.min(props.max_fall_speed, vsp + ((i > hitstun) ? props.gravity_accel : props.hitstun_gravity_accel))
      x += hsp;
      y += vsp;
      if (i <= hitstun) {
        hitstunPath += `L ${x} ${y} `;
        if (i === hitstun) fallPath = `M ${x} ${y} `;
      } else {
        fallPath += `L ${x} ${y} `;
      }

    }
    return [hitstunPath, fallPath];
  }

  const getFullHitboxData = (hb) => {
    let parent = hb.parentHitbox;
    if (parent) {
      return {...hb, ...getFullHitboxData(hb.parentHitbox)};
    }
    return hb;
  }

  $: {
    $guidelineLength, // just to make the line update when guideline length does

    frameData = $timeline[$currentFrame];
    hitboxData = frameData.hitboxes.map((hb) => getFullHitboxData(hb));
    let imgObj = $spriteData[frameData.sprite];

    spr.data = imgObj.img || $spriteData['null_sprite.png'].img;
    spr.frameCount = imgObj.frameCount;
    spr.offsets = {x: imgObj.xoff, y: imgObj.yoff};
    spr.idx = frameData.spriteFrame(spr.frameCount);
    spr.frameWidth = spr.data.width / imgObj.frameCount;

    imgObj = $spriteData[frameData.hbSprite];
    if (imgObj !== undefined) {
      hurt.data = imgObj.img || $spriteData['null_sprite.png'].img;
      hurt.frameCount = imgObj.frameCount;
      hurt.offsets = spr.offsets; // in-game they're auto-obtained from the main sprite as well
      hurt.idx = frameData.spriteFrame(hurt.frameCount);
      hurt.frameWidth = hurt.data.width / imgObj.frameCount;
    } else {
      hurt.data = undefined;
    }

    if ($showGuideline && $selectedHitbox._idx !== -1) selectedHitboxPaths = calcKnockbackPaths($selectedHitbox, $targetAttributes);

    hitboxData.map((hb) => {
      let imgObj = $spriteData[hb.sprite];
      if (imgObj) {
        hb.imageData = imgObj.img;
        hb.imageFrameCount = imgObj.frameCount;
        hb.imageOffsetX = imgObj.xoff;
        hb.imageOffsetY = imgObj.yoff;
        hb.imageIdx = hb.spriteFrame(imgObj.frameCount);
      }
      else {
        hb.imageData = undefined;
      }
      return hb;
    });
  }

  const resizeTracker = () => {
    camera.width = myContainer.clientWidth;
    camera.height = myContainer.clientHeight;
  }

  onMount(() => {
    window.addEventListener('resize', resizeTracker);
    camera.width = myContainer.clientWidth;
    camera.height = myContainer.clientHeight;
  })

  onDestroy(() => {
    window.removeEventListener('resize', resizeTracker);
  })

</script>

<style>
  #container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  svg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }

</style>