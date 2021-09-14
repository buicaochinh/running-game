const settingSprite = ({ sprite, firstX, firstY, width, height, anchor, speed, screen}) => {
    sprite.position.set(firstX, firstY);
    sprite.width = width;
    sprite.height = height;
    sprite.anchor.set(anchor);
    screen.addChild(sprite);
    sprite.play()
    sprite.animationSpeed = speed;
    sprite.ready = true;
}
