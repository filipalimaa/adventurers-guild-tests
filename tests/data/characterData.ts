import type { CharacterRequestBackgroundPatch, CharacterRequestClassPatch, CharacterRequestPost, CharacterRequestSpeciesPatch } from "../types/characterRequest.js";

export const CHARACTER_NAME: CharacterRequestPost = {
    name: 'Filara, the Wandering Sage',
};

export const CHARACTER_CLASSId: CharacterRequestClassPatch = {
    classId: 12,
};

export const CHARACTER_SPECIESId: CharacterRequestSpeciesPatch = {
    speciesId: 4,
};

export const CHARACTER_BACKGROUNDId: CharacterRequestBackgroundPatch = {
    backgroundId: 13,
};
