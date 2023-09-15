<div id="container">
  <div id="render-opts">
    <div class="check-group">
      <label>show hitboxes?</label>
      <input type="checkbox" bind:checked={$showHitboxes} >
    </div>
    <div class="check-group">
      <label>show angle?</label>
      <input type="checkbox" bind:checked={$showAngle} >
    </div>
    <div class="check-group">
      <label>show guidelines?</label>
      <input type="checkbox" bind:checked={$showGuideline} >
    </div>
    <div class="input-group">
      <label>guideline duration (in frames)</label>
      <input type="number" bind:value={$guidelineLength} step="1" >
    </div>
    <div class="check-group">
      <label>show hurtbox?</label>
      <input type="checkbox" bind:checked={$showHurtbox} >
    </div>
    <div class="input-group">
      <label>hurtbox opacity</label>
      <input type="number" bind:value={$hurtboxOpacity} step="0.05" max="1" min="0" >
    </div>
    <div class="check-group">
      <label>show whifflag?</label>
      <input type="checkbox" bind:checked={$showWhifflag} on:change={refreshTimeline}>
    </div>
    <div class="input-group">
      <button on:click={() => selectedHitbox.set({_idx: -1})}>clear hitbox selection</button>
    </div>
    {#if $displayModes.length > 0}
      <div class="input-group">
        <label>display mode</label>
        <select bind:value={$displayModeIndex} on:change={refreshTimeline}>
          {#each $displayModes as mode, i}
            <option value={i}>{mode}</option>
          {/each}
        </select>
      </div>
    {/if}
  </div>
  <div id="attributes">
    <div class="input-group">
      <label>target character</label>
      <select bind:this={charSelect} on:change={updateCharacter}>
        <option value="__custom__" selected>custom</option>
        {#each Object.keys(RoACharStats) as charName}
          <option value={charName}>{charName}</option>
        {/each}
      </select>
    </div>
    <div class="input-group">
      <label>damage</label>
      <input type="number" bind:value={$targetAttributes.damage} step="1" >
    </div>
    <div class="input-group">
      <label>knockback_adj</label>
      <input type="number" on:change={updateAttribute} bind:value={$targetAttributes.knockback_adj} step="0.05" >
    </div>
    <div class="input-group">
      <label>hitstun_grav</label>
      <input type="number" on:change={updateAttribute} bind:value={$targetAttributes.hitstun_gravity_accel} step="0.05" >
    </div>
    <div class="input-group">
      <label>gravity_speed</label>
      <input type="number" on:change={updateAttribute} bind:value={$targetAttributes.gravity_accel} step="0.05" >
    </div>
    <div class="input-group">
      <label>air_friction</label>
      <input type="number" on:change={updateAttribute} bind:value={$targetAttributes.air_friction} step="0.05" >
    </div>
    <div class="input-group">
      <label>max_fall</label>
      <input type="number" on:change={updateAttribute} bind:value={$targetAttributes.max_fall_speed} step="0.05" >
    </div>
  </div>
</div>

<script>
  import {
    targetAttributes,
    showHitboxes,
    showAngle,
    showGuideline,
    showWhifflag,
    guidelineLength,
    selectedHitbox,
    showHurtbox,
    hurtboxOpacity,
    displayModes,
    displayModeIndex
  } from '../../store/renderOptions.js';
	import getData from '../../util/emulation/extractData';
  import RoACharStats from '../../util/RoACharStats.js';

  let charSelect;

  const refreshTimeline = () => getData('moveEditor');

  const updateCharacter = (evt) => {
    if (evt.target.value !== '__custom__') targetAttributes.setCharacter(evt.target.value)
  }

  const updateAttribute = (evt) => {
    if (evt.target.id !== 'damage') {
      charSelect.value = "__custom__";
    }
  }

</script>

<style>
  #container {
    display: flex;
    flex-direction: row;
  }

  #render-opts { flex-grow: 1 }
  #attributes { flex-grow: 1 }

  .check-group {
    height: 15px;
    position: relative;
    width: 200px;
    margin-bottom: 5px;
  }

  .input-group {
    height: 35px;
    position: relative;
    width: 200px;
    margin-bottom: 5px;
  }

  .check-group label,
  .input-group label {
    font-size: 10px;
    position: absolute;
    top: 0;
    left: 0;
    margin: auto;
  }

  .check-group input {
    position: absolute;
    top: 0;
    right: 0;
    margin: auto;
  }

  .input-group input,
  .input-group select {
    padding: 0 0.4em;
    height: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100%;
    box-sizing: border-box;
  }

</style>