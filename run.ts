const days = Bun.argv.map(Number).filter(Number.isInteger);

let day = 0;

while (true) {
  const path = `./day${String(++day).padStart(2, '0')}/index.ts`;
  const file = Bun.file(path);

  if (!await file.exists()) {
    break;
  }

  if (days.length && !days.includes(day)) {
    continue;
  }

  console.log(`Day ${day}`);
  await Bun.$`bun ${path}`;
}
