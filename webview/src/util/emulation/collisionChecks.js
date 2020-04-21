export const checkPixelCollision = (sprA, sprB, checkBounds) => {
  const c1 = document.createElement('canvas');
  c1.width = 960;
  c1.height = 540;
  const ctx1 = c1.getContext('2d');
  const c2 = document.createElement('canvas');
  c2.width = 960;
  c2.height = 540;
  const ctx2 = c2.getContext('2d');

  ctx1.drawImage(sprA.img, sprA.x, sprA.y);
  ctx2.drawImage(sprB.img, sprB.x, sprB.y);

  const d1 = ctx1.getImageData(checkBounds.x1, checkBounds.y1, checkBounds.width, checkBounds.height).data;
  const d2 = ctx2.getImageData(checkBounds.x1, checkBounds.y1, checkBounds.width, checkBounds.height).data;

  for (let i = 0; i < d1.length; i += 4) {
    if (d1[i + 3] !== 0 && d2[i + 3] !== 0) return true;
  }
  return false;
}

export const checkBoundingBoxes = (sprA, sprB) => {
  const l1 = {x: sprA.x, y: sprA.y};
  const r1 = {x: sprA.x + sprA.width, y: sprA.y + sprA.height};
  const l2 = {x: sprB.x, y: sprB.y};
  const r2 = {x: sprB.x + sprB.width, y: sprB.y + sprB.height};

  if (l1.x > r2.x || r1.x < l2.x || l1.y > r2.y || r1.y < l2.y )
    return false;

  const {min, max} = Math;
  return {
    x1: max(l1.x, l2.x),
    y1: max(l1.y, l2.y),
    x2: min(r1.x, r2.x),
    y2: min(r1.y, r2.y),
    get width() {return this.x2 - this.x1},
    get height() {return this.y2 - this.y1}
  }
}

export const getInstanceSprite = (inst, nullImg) => {
  const ownImg = inst.animLinks[inst.fields.sprite_index] || nullImg;

  let xoff = 16;
  let yoff = 64;
  let width = 32;
  let height = 62;
  let kind = 'box';
  if (ownImg.hitbox) {
    switch (ownImg.hitbox.type) {
      case 'box':
      default:
        xoff = ownImg.hitbox.xoff;
        yoff = ownImg.hitbox.yoff;
        width = ownImg.hitbox.width;
        height = ownImg.hitbox.height;
        break;
    }
  }

  if (!(xoff || xoff === 0)) { xoff = ownImg.xoff || 0 }
  if (!(yoff || yoff === 0)) { yoff = ownImg.yoff || 0 }

  return {
    img: ownImg.data,
    x: inst.fields.x - xoff,
    y: inst.fields.y - yoff,
    width: width || (ownImg.data.width / ownImg.frameCount),
    height: height || ownImg.data.height,
    kind
  }
}

const checkCollision = (sprA, sprB) => {
  let box = checkBoundingBoxes(sprA, sprB);
  if (!box || [box.width, box.height].includes(0)) return false;
  if ([sprA.kind, sprB.kind].includes('pixel')) return checkPixelCollision(sprA, sprB, box);
  else return true;
}

export default checkCollision;