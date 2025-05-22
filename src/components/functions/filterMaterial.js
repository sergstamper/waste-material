function filterMaterial(material, is1440Checked) {
    const modifiedMaterial = { ...material };

    modifiedMaterial.size = modifiedMaterial.size.map(Number);

    if (is1440Checked) {
        modifiedMaterial.size = modifiedMaterial.size.filter((size) => size <= 1600);
    } else {
        modifiedMaterial.size = material.size;
    }

    return modifiedMaterial;
}

export default filterMaterial;