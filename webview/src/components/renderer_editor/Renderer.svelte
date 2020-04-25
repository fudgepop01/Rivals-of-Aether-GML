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
        <rect x="{(imageIdx % imageFrameCount) / imageFrameCount}" y="0" width="{1 / imageFrameCount}" height="1" />
      </clipPath>
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
      x="{0 - imageOffsets.x - ((imageIdx % imageFrameCount) / imageFrameCount) * imageData.width}"
      y="{0 - imageOffsets.y}"
      width="{imageData.width}"
      height="{imageData.height}"
      xlink:href="{imageData.src}"
      clip-path="url(#spriteClip)"
    />
    <!-- hitboxes -->
    {#if $showHitboxes}
      {#each hitboxData as hitbox, i}
        <!-- hitboxes -->
        {#if hitbox.shape === 0}
          <ellipse
            on:click={() => selectedHitbox.set(hitbox)}
            class="hitbox"
            data-index={i}
            cx="{hitbox.xPos}"
            cy="{hitbox.yPos}"
            rx="{hitbox.width / 2}"
            ry="{hitbox.height / 2}"
            fill="{hitbox === selectedHitbox ? '#cc08' : '#c008'}"
          />
        {:else if hitbox.shape === 1}
          <rect
            on:click={() => selectedHitbox.set(hitbox)}
            class="hitbox"
            data-index={i}
            x="{hitbox.xPos}"
            y="{hitbox.yPos}"
            width="{hitbox.width}"
            height="{hitbox.height}"
            fill="{hitbox === selectedHitbox ? '#cc08' : '#c008'}"
          />
        {:else}
          <rect
            on:click={() => selectedHitbox.set(hitbox)}
            class="hitbox"
            data-index={i}
            x="{hitbox.xPos}"
            y="{hitbox.yPos}"
            rx="{hitbox.width * 0.25}"
            ry="{hitbox.height * 0.25}"
            width="{hitbox.width}"
            height="{hitbox.height}"
            fill="{hitbox === selectedHitbox ? '#cc08' : '#c008'}"
          />
        {/if}
      {/each}
    {/if}
    <!-- angles -->
    {#if $showAngle}
      {#each hitboxData as hitbox}
        <path
          d="M {hitbox.xPos} {hitbox.yPos} l {Math.cos(hitbox.angleRad) * hitbox.knockback * 5} {Math.sin(hitbox.angleRad) * -1 * hitbox.knockback * 5}"
          stroke-width="5"
          stroke="#000"
          marker-end="url(#head)"
        />
        <path
          d="M {hitbox.xPos} {hitbox.yPos} l {Math.cos(hitbox.angleRad) * (hitbox.knockback + 1) * 5} {Math.sin(hitbox.angleRad) * -1 * (hitbox.knockback + 1) * 5}"
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
  import { targetAttributes, showHitboxes, showAngle, showGuideline, guidelineLength, selectedHitbox } from '../../store/renderOptions.js';
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
  let imageData;
  let imageIdx;
  let imageOffsets;
  let imageFrameCount;
  let singleFrameWidth;
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
    let x = hitbox.xPos;
    let y = hitbox.yPos;
    let hitstunPath = `M ${x} ${y} `
    let fallPath = ``;
    for (let i = 0; i < $guidelineLength; i++) {
      hsp = approach(hsp, 0, props.air_friction)
      vsp = Math.min(props.max_fall_speed, vsp + ((i > hitstun) ? props.gravity_accel : props.hitstun_gravity_accel))
      x += Math.round(hsp);
      y += Math.round(vsp);
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
    imageData = $spriteData[frameData.sprite].img || window['sprite_builtins']['null_sprite.png'];
    let imgObj = $spriteData[frameData.sprite];
    imageFrameCount = imgObj.frameCount;
    imageOffsets = {x: imgObj.xoff, y: imgObj.yoff};
    imageIdx = frameData.spriteFrame(imageFrameCount);
    singleFrameWidth = imageData.width / imgObj.frameCount;
    if ($showGuideline && $selectedHitbox._idx !== -1) selectedHitboxPaths = calcKnockbackPaths($selectedHitbox, $targetAttributes);

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