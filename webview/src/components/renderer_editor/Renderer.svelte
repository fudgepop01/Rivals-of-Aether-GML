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
    {#each frameData.hitboxes as hitbox, i}
      {#if hitbox.shape === 0}
        <ellipse
          class="hitbox"
          data-index={i}
          cx="{hitbox.xPos}"
          cy="{hitbox.yPos}"
          rx="{hitbox.width / 2}"
          ry="{hitbox.height / 2}"
          fill="#c008"
        />
      {:else if hitbox.shape === 1}
        <rect
          class="hitbox"
          data-index={i}
          x="{hitbox.xPos}"
          y="{hitbox.yPos}"
          width="{hitbox.width}"
          height="{hitbox.height}"
          fill="#c008"
        />
      {:else}
        <rect
          class="hitbox"
          data-index={i}
          x="{hitbox.xPos}"
          y="{hitbox.yPos}"
          rx="{hitbox.width * 0.25}"
          ry="{hitbox.height * 0.25}"
          width="{hitbox.width}"
          height="{hitbox.height}"
          fill="#c008"
        />
      {/if}
    {/each}
  </svg>
</div>

<script>
  import { spriteData, soundSources } from '../../store/user_data_store.js';
  import { currentFrame } from '../../store/windows_editor.js';
  import { timeline } from '../../store/gameState_editor.js';
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
  let imageData;
  let imageIdx;
  let imageOffsets;
  let imageFrameCount;
  let singleFrameWidth;

  $: {
    frameData = $timeline[$currentFrame];
    imageData = $spriteData[frameData.sprite].img || window['sprite_builtins']['null_sprite.png'];
    let imgObj = $spriteData[frameData.sprite];
    imageFrameCount = imgObj.frameCount;
    imageOffsets = {x: imgObj.xoff, y: imgObj.yoff};
    imageIdx = frameData.spriteFrame(imageFrameCount);
    singleFrameWidth = imageData.width / imgObj.frameCount;
    // if (frameData.sfx) {
    //   if ($soundSources[frameData.sfx]) window['playSound']($soundSources[frameData.sfx])
    //   else if (window['audio_builtins'][frameData.sfx]) window['playSound'](window['audio_builtins'][frameData.sfx])
    // }
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