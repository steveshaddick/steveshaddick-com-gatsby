export const renderTitle = text => {
  const words = text.split(" ");
  let output = [];

  for (let i = 0, len = words.length; i < len; i++) {
    const rndDuration = Math.random() * 500 + 200;
    const rndY = Math.random() * -40 - 10;

    output.push(
      `<span class="title-word-transition" style="transition-duration:${rndDuration}ms; transform:translate3d(0,${rndY}px,0);">${words[i]}</span>`
    );
  }

  return { __html: output.join(" ") };
};
