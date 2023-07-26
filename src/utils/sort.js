export function compareByNameSimilarity(a, b, sortValue, ObjField) {
    const nameA = a[ObjField].toLowerCase();
    const nameB = b[ObjField].toLowerCase();
    const searchName = sortValue.toLowerCase();

    if (nameA === searchName || nameB === searchName)
        return nameA === searchName ? -1 : 1;

    const similarityA = nameA.startsWith(searchName) ? 1 : 0;
    const similarityB = nameB.startsWith(searchName) ? 1 : 0;

    return similarityB - similarityA;
}