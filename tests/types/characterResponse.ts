interface ArmorClass {
    total: number,
    base: number,
    dexModifierApplied: number,
    classBonus: number,
    shieldBonus: number,
    sources: string[]
};

interface InventoryWeight {
    total: number,
    unit: string,
    sources: string[],
};

interface SpellCastingSummary {
    canCastSpells: boolean,
    ability: string | null,
    abilityModifier: string | null,
    spellSaveDc: string | null,
    spellAttackBonus: string | null,
    selectedSpellsCount: number,
    selectedCantripsCount: number,
};

export interface CharacterResponsePost {
    id: number,
    name: string,
    status: string,
    classId: number | null,
    speciesId: number | null,
    backgroundId: number | null,
    level: number,
    missingFields: string[],
    pendingChoices: string[],
    abilityScores: string | null,
    abilityModifiers: string | null,
    armorClass: ArmorClass,
    weaponAttacks: string[],
    hitpoints: string | null,
    savingThrows: string[],
    initiative: string | null,
    passivePerception: string | null,
    movement: string | null,
    inventoryWeight: InventoryWeight,
    spellcastingSummary: SpellCastingSummary,
    spellSlots: string[],
    selectedSpells: string[],
    currency: string | null,
    skillProficiencies: string[],
    abilityScoreRules: string | null,
    classDetails: string | null,
    speciesDetails: string | null,
    backgroundDetails: string | null,
};