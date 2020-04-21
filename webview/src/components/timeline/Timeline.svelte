<div class="container"
  style="width: {timelineWidth}px"
>
  {#if actionsLoaded}
  <div class="toolbar">
    <div class="left-align">
      <span class="frame">{`${$currentFrame + 1}`.padStart($frameCount.toString().length, ' ')} / {$frameCount}</span>
      <svg on:click={() => audio = !audio}><path d={audio ? mdiVolumeHigh : mdiVolumeMute}/></svg>
    </div>
    <div class="center-align">
      <svg><path d={mdiSkipPrevious}/></svg>
      <svg on:click={togglePlay}><path d={playing ? mdiPause : mdiPlay}/></svg>
      <svg on:click={nextState}><path d={mdiSkipNext}/></svg>
    </div>
    <div class="right-align">
      <svg on:click={toggleOverPlay}><path d={!overPlay ? mdiFormatTextWrappingOverflow : mdiSync}></path></svg>
      <svg on:click={playSpeed.increase}><path d={mdiMenuUp}/></svg>
      <span class="play-speed">{`x${$playSpeed}`.padStart(5, ' ')}</span>
      <svg on:click={playSpeed.decrease}><path d={mdiMenuDown}/></svg>
    </div>
  </div>
  <div class="timeline-container" bind:this={timelineContainer}>
    <div class="timeline"
      style="width: { $frameCount !== 0 ? `${timelineScale * $frameCount}px` : `100%`};"
    >
      {#each $windows as win, i}
        <div
          class="window"
          on:click={() => selectedWindow.set(i)}
          on:wheel={handleZoom}
          tabindex="0"
          style="flex-grow: {win.frameCount};
            background-color: {win.color};
            {$selectedWindow === i ? 'box-shadow: inset 0 0 0 2px black, inset 0 0 0 3px white' : ''}"
        >
          <span
            class="window-name"
          >{win.name}</span>
          <!-- {#if $selectedWindow === i}
            <div class="window-controls">
              <svg viewBox="0 0 24 24" on:click|stopPropagation={addWindowLeft}><path d={mdiPlus}/></svg>
              <svg viewBox="0 0 24 24" on:click|stopPropagation={removeWindow}><path d={mdiDelete}/></svg>
              <svg viewBox="0 0 24 24" on:click|stopPropagation={addWindowRight}><path d={mdiPlus}/></svg>
            </div>
          {/if} -->
        </div>
      {/each}
      {#if $windows.length === 0}
        <div
          class="window"
          style="flex-grow: 1;
            height: calc(100% - 8px);
            background-color: #000"
        >
          <span
            class="window-name"
            style="color: #fff"
          >no parts created</span>
          <!-- <div class="window-controls">
            <svg viewBox="0 0 24 24" on:click|stopPropagation={addWindowRight}><path d={mdiPlus}/></svg>
          </div> -->
        </div>
      {/if}
    </div>

    <div
      class="frame-indicators"
      style="width: {timelineScale * $frameCount}px;"
    >
      {#each new Array($frameCount).fill(0) as _, i}
        <div class="indicator {i === $currentFrame ? 'cur' : ''}">
          <div class="selector"
            style="{i === $currentFrame ? 'background-color: #D00;' : ''}"
            on:click={() => currentFrame.set(i) }
          ></div>
          {#if i !== $frameCount}
            <div class="bar bar-l"></div>
            <div class="bar bar-r"></div>
          {/if}
          <div class="current"
            style="background-color: {i === $currentFrame ? '#AAA' : 'transparent'};"
          ></div>
        </div>
      {/each}
    </div>
  </div>
  {:else}
    loading...
  {/if}


  <Actions
    bind:playing
    bind:windowBoundaries
    bind:timelineScale
    bind:timelineWidth
    bind:overPlay
    on:mounted={getActions}
  />
</div>

<script>
  import { tick } from 'svelte';

  import {
    mdiVolumeHigh,
    mdiVolumeMute,
    mdiSkipPrevious,
    mdiSkipNext,
    mdiPlay,
    mdiPause,
    mdiMenuDown,
    mdiMenuUp,
    mdiPlus,
    mdiDelete,
    mdiFormatTextWrappingOverflow,
    mdiSync
  } from '@mdi/js'

  import {
    currentFrame,
    windows,
    selectedWindow,
    windowPositions,
    playSpeed,
    frameCount
  } from '../../store/windows.js';

  import Actions from './actions.svelte';

  export let timelineWidth = 500;

  let playing;
  let windowBoundaries = [];
  let audio = true;
  let timelineScale = 10;

  let timelineContainer;

  let actionsLoaded = false;
  let togglePlay;
  let handleZoom;
  let nextState;
  let overPlay;
  let toggleOverPlay;
  const getActions = async (evt) => {
    // recieve data
    ({
      togglePlay,
      handleZoom,
      nextState,
      toggleOverPlay
    } = evt.detail);

    // update
    actionsLoaded = true;
    await tick();

    // send back data
    evt.detail.callback(timelineContainer);
  }

</script>

<style>
  .container {
    height: 75px;
    background-color: grey;
    position: relative;
    user-select: none;
    width: 100%;
  }

  .toolbar {
    background-color: #000;
    color: #fff;
    width: 100%;
    height: 30px;

    display: flex;
    flex-direction: row;
  }

  .toolbar > div { flex: 1; position: relative; }
  .toolbar .left-align { display: flex; justify-content: flex-start; }
  .toolbar .center-align { display: flex; justify-content: center; }
  .toolbar .right-align { display: flex; justify-content: flex-end; }
  .toolbar svg {
    position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
    fill: #fff;
    margin-top: 3px;
  }

  svg:hover path {
    stroke: #fff;
    stroke-width: 1;
  }

  .frame,
  .play-speed,
  .window-name {
    position: relative;
    margin-top: 3px;
    padding: 0 5px;
    font-family: "Roboto Mono";
    white-space: pre;
  }

  .timeline-container {
    background-color: #fff;
    position: relative;
    width: 100%;
    height: 55px;

    overflow-x: scroll;
    overflow-y: hidden;
  }
  .timeline-container::-webkit-scrollbar {
    display: none;
  }

  .timeline {
    background-color: #fff;
    position: relative;
    height: 100%;

    display: flex;
    flex-direction: row;
  }

  .window {
    position: relative;

    text-align: left;
    margin: 8px 2px 4px 2px;
    border-radius: 5px;
    height: calc(100% - 12px);
    font-size: 18px;
    overflow: hidden;
  }
  .window-name {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .window-controls {
    position: absolute;
    margin: auto;
    bottom: 0;
    width: 100%;
    background-color: #000;
    height: 15px;
  }
  .window-controls svg {
    position: relative;
    margin-bottom: 6px;
    height: 15px;
    width: 15px;
    fill: #fff;
  }

  .frame-indicators {
    position: absolute;
    margin: auto;
    top: 0;
    height: 5px;
    width: 100%;

    display: flex;
    flex-direction: row;
    overflow: visible;
  }

  .frame-indicators .indicator { position: relative; flex: 1; }
  .frame-indicators .indicator.cur { height: 55px; pointer-events: none }
  .frame-indicators .indicator .bar {
    position: absolute;
    margin: auto;
    top: 0;
    width: 1px;
    height: 5px;
    background-color: #888;
    mix-blend-mode: multiply;
  }
  .bar-r { right: 0 }
  .bar-l { left: 0 }

  .frame-indicators .indicator .selector {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 5px;
    background-color: #AAA;
    isolation: isolate;
  }

  .frame-indicators .indicator .selector:hover {
    height: 10px;
    margin-top: -2px;
    background-color: #f88;
    border-bottom: 1px solid #000;
  }

  .frame-indicators .indicator .current {
    position: absolute;
    margin: auto;
    bottom: 4px;
    width: 100%;
    height: calc(100% - 12px);
    mix-blend-mode: multiply;
    pointer-events: none;
  }

</style>