export const velocityAtFrame = (baseAccel, baseVelocity, frame) => {
  return (Math.abs(baseAccel * frame + baseVelocity) + baseAccel * frame + baseVelocity) / 2;
}

export const velocityAtFrameGrav = (baseAccel, baseVelocity, frame) => {
    return baseAccel * frame + baseVelocity;
  }

export const actualPositionAtFrame = (baseAccel, baseVelocity, basePosition, frame) => {
    let sum = basePosition;
    for (let i = 0; i < frame; i++) {
      sum += velocityAtFrame(baseAccel, baseVelocity, i);
    }
    return sum;
  } 