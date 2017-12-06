import { Injectable } from '@angular/core';

/*
  Generated class for the NicknameGeneratorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NicknameGeneratorProvider {

  adjectives: string[] = ["attractive", "awesome", "bald", "bashful", "bold", "brave", "chatty", "cheerful", "chineeze", "curious", "crazy", "dopey", "dreamy", "drunk", 
    "enthusiatic", "fluffy", "funky", "grumpy", "happy", "hirsute", "hungry", "mad", "madcap", "magic", "mannered", "multicolor", "mysterious", "mystic", "noisy", 
    "nutty", "lazy", "sagacious", "scatterbrain", "shaggy", "shining", "skilled",
    "sleepy", "sneezy", "stylish", "shy", "talktive", "timid", "tiny", "vengeful", "vivacious", "voracious", "wily", "wise"];

  nouns: string[] = ["beaver", "bunny", "camel", "carrot", "cheeta", "chicken", "crab", "cub", "cupcake", "deer", "dormouse", "duck", "jackal", "horse", "hedgedog", 
    "hippopotamus", "lama", "lemur", "leopard", "lynx", "kangaroo", "kitten", "kiwi", "koala", "monkey", "okapi", "otter", "owl", 
    "panda", "pangolin", "parrot", "porcupine", "pony", "sloth", "tadpole", "tiger", "tortoise", "turkey", "sea horse", "seal", "squirrel", "unicorn", "whale", "worm"];

  adjectivesFrM: string[] = ["100% bio", "affamé", "agile", "alcoolique", "audacieux", "aventureux", "bavard", "bougon", "bruyant", "caracolant", "chantant",
    "charismatique", "charmant", "chaste", "chauve", "chinois", "cleptomane", "curieux", "déjanté", "dérangé", "désinvolte", "déterminé", "élégant", "enchanté", "endormi", 
    "enjoué",  "étourdi", "farfelu", "funky", "gargantuesque", "gonflable", "gourmand", "grincheux", "hyperactif", "impétueux", "incrédule", "intrépide", "joyeux", "loufoque", "magique",
    "maladroit", "malicieux", "malvoyant", "moqueur", "multicolore", "mystérieux", "paresseux", "pelucheux", "pénible", "perturbé", "poilu", "poilant", "prétentieux", "respectueux", "revêche",
    "roublard", "sagace", "séduisant", "sensible", "simplet", "somnolent", "sophistiqué", "taré", "timide", "tonitruant", "tout doux", "vaillant", "vengeur", 
    "vigoureux", "vivace", "vigilant", "vorace"];

  adjectivesFrF: string[] = ["100% bio", "affamée", "agile", "alcoolique", "audacieuse", "aventureuse", "bavarde", "bougonne", "bruyante", "caracolante", 
  "chantante", "charismatique", "charmante", "chaste", "chauve", "chinoise", "cleptomane", "curieuse", "déjantée", "dérangée", "désinvolte", "déterminée", "distrait", 
  "élégante","enchantée", "endormie", "enjouée", "étourdie", "farfelue", "funky", "gargantuesque", "gonflable", "gourmande", "grincheus", "hyperactive", 
  "impétueuse", "incrédule", "intrépide", "joyeuse", "loufoque", "magique", "maladroite", "malicieuse", "malvoyante", "multicolore", "mystérieuse", "mystique",
  "paresseuse", "pénible", "perturbée", "poilue", "poilante", "prétentieuse","respectueuse", "revêche", "roublarde", "sagace", 
  "séduisante", "sensible", "simplette", "somnolente", "sophistiquée", "tarée", "timide", "tonitruante", "toute douce", "vaillante", "veloce",
  "vengeuse", "vigoureuse", "vivace", "vigilante", "vorace"];

  nounsFrM: string[] = ["asticot", "blaireau", "bonobo", "biche", "cachalot", "canard", "castor", "chacal", "chameau", "chaton", "chimpanzé", "crabe", "chevreuil", "coyote", "dindon", 
    "drommadaire", "écureuil", "étalon", "guépard", "hippopotame", "hérisson", "hypocampe", "kangourou", "kiwi", "koala", "lama", "lapin", "lémurien", "léopard", "loir", 
    "lynx", "manchot", "matou", "morse", "okapi", "ornythorinque", "ouistiti", "panda", "paresseux", "perroquet", "poney", "porc-épic", "poulpe", "poussin", "phasme", "ragondin", "rhinocéros"
    , "souriceau", "taureau", "tétard", "tigre"];
  nounsFrF: string[] = ["belette", "brebis", "chouette", "giraphe", "licorne", "loutre", "mangouste", "marmotte", "poule", "pieuvre", "taupe", "tortue"];

  constructor() {}

  generateNickname(): string {

    let adjRank = this.getRandomNumberBetween(0, this.adjectives.length);
    let nounsRank = this.getRandomNumberBetween(0, this.nouns.length);

    return this.adjectives[adjRank] + " " + this.nouns[nounsRank];
  }

  generateNicknameFr(): string {

    let total = this.nounsFrM.length + this.nounsFrF.length;

    let chanceToBeMale = this.nounsFrM.length/total;
    let randNumber = Math.random();

    let noun = "";
    let adj = "";
    if(randNumber < chanceToBeMale) {
      noun = this.nounsFrM[this.getRandomNumberBetween(0,  this.nounsFrM.length)];
      adj = this.adjectivesFrM[this.getRandomNumberBetween(0,  this.adjectivesFrM.length)];
    } else {
      noun = this.nounsFrF[this.getRandomNumberBetween(0,  this.nounsFrF.length)];
      adj = this.adjectivesFrF[this.getRandomNumberBetween(0,  this.adjectivesFrF.length)];
    }

    return noun + " " + adj;
  }
  
  getRandomNumberBetween(from: number, to: number): number {

    return Math.floor(Math.random() * to) + from;;
  }

  createWord(name: string, gender: string) {
    return { name: name, gender: gender };
  }
}