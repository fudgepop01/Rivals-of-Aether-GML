<script>
  import { onMount, createEventDispatcher, tick } from 'svelte';

  import {
    currentFrame,
    playSpeed,
    windows,
    selectedWindow,
    windowPositions,
    frameCount
  } from '../../store/windows.js';

  import { timeline } from '../../store/gameState.js';

  export let playing = false;
  export let overPlay = false;
  export let timelineScale;
  export let timelineWidth;

  // loaded on mount
  let timelineContainer;

  let fpsMonitor = 0;
  const loop = () => {
    if (playing) {
      requestAnimationFrame(loop);
      fpsMonitor++;
      if (fpsMonitor >= (1 / ($playSpeed * 0.5))) {
        fpsMonitor = 0;
        if ($currentFrame + 1 >= $frameCount) {
          if (overPlay) timeline.nextFrame($currentFrame + 1);
          else currentFrame.set(0);
        }
        else { currentFrame.update(n => n + 1) }
      }
      timelineContainer.scrollLeft = ($currentFrame - Math.floor(timelineWidth / timelineScale / 2)) * timelineScale
    }
  }
  const togglePlay = () => {
    playing = !playing;
    if (playing) loop();
  }
  const toggleOverPlay = () => overPlay = !overPlay;

  const handleZoom = (evt) => {
    timelineScale += evt.deltaY / 100
    if (timelineScale < 8) timelineScale = 8;
    else if (timelineScale > 100) timelineScale = 100;
  }

  const NS = () => {
    timeline.nextFrame($currentFrame + 1);
    currentFrame.update(n => n + 1);
  }

  const dispatch = createEventDispatcher();
  onMount(() => {
    dispatch('mounted', {
      togglePlay,
      handleZoom,
      nextState: NS,
      overPlay,
      toggleOverPlay,
      callback(tlc) {
        timelineContainer = tlc;
      }
    })
  })
</script>