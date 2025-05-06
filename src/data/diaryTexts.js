// Collection of happy diary texts for bike stations
export const happyTexts = {
  text1: `Vandaag was een fantastische dag! Zo veel mensen kozen voor duurzaam vervoer. Ik voel me trots om deel uit te maken van deze fietscultuur. Mijn rekken zijn goed gevuld en klaar voor iedereen die een fiets nodig heeft.`,

  text2: `Wat een drukte vandaag! Er is een levendige energie rond me heen, mensen lachen en praten terwijl ze hun fietsen stallen. Het is fijn om te zien dat zo veel mensen kiezen voor de fiets in plaats van de auto.`,

  text3: `De zon schijnt, mijn rekken zijn vol, en ik voel me compleet! Er hangt een opgewekte sfeer in de lucht. Ik hou van dagen als deze, wanneer ik kan helpen om de stad in beweging te houden.`,

  text4: `Vandaag was een dag vol positieve energie! Mijn fietsen werden goed gebruikt, maar keerden steeds terug. Het geeft me een warm gevoel om te weten dat ik zo belangrijk ben voor de mensen in deze buurt.`,

  text5: `Wat een vrolijke dag! Mijn rekken zijn bijna vol, wat betekent dat mensen genieten van de stad te voet. Het is een perfecte balans vandaag, en ik voel me heel tevreden.`,
};

// Collection of sad diary texts for bike stations
export const sadTexts = {
  text1: `Vandaag voelt een beetje eenzaam. Zo veel van mijn fietsen zijn weg, en de lege plekken doen pijn. Ik vraag me af waar ze allemaal naartoe zijn en wanneer ze terugkomen.`,

  text2: `Ik voel me niet zo goed vandaag. Mijn rekken zijn half leeg, en er is minder bedrijvigheid om me heen. De stilte is soms overweldigend. Ik mis het geluid van fietsbellen en pratende mensen.`,

  text3: `Het is een stille dag geweest. Veel te veel lege plekken waar normaal fietsen zouden staan. Ik hoop maar dat de mensen die mijn fietsen hebben geleend, plezier hebben op hun rit.`,

  text4: `Vandaag voel ik me een beetje vergeten. De meeste van mijn fietsen zijn vertrokken en niet teruggekomen. Het geeft me een leeg gevoel, alsof ik niet meer nuttig ben voor de buurt.`,

  text5: `Ik mis mijn fietsen vandaag... Er zijn zoveel lege plekken. Ik vraag me af of ze me vergeten zijn, of dat het gewoon een van die dagen is. Hopelijk worden mijn rekken snel weer gevuld.`,
};

// Get a diary text based on station name for consistent assignment
export function getDiaryText(stationName, isHappy) {
  const texts = isHappy ? happyTexts : sadTexts;

  // Get a consistent text based on station name
  const stationNameSum = stationName
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const textIndex = (stationNameSum % 5) + 1;

  return texts[`text${textIndex}`];
}
