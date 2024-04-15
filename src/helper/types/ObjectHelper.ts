export class ObjectHelper {
  static isObject(obj) {
    return obj !== null && typeof obj === 'object';
  }

  static diffObject(objetoOriginal, objetoComAlteracoes) {
    const alteracoes = {};
    Object.keys(objetoComAlteracoes).forEach((chave) => {
      const valorOriginal = objetoOriginal[chave];
      const valorAlterado = objetoComAlteracoes[chave];

      if (Array.isArray(valorOriginal) && Array.isArray(valorAlterado)) {
        if (!ObjectHelper.isArrayEqual(valorOriginal, valorAlterado))
          alteracoes[chave] = valorAlterado;
        return;
      }

      if (
        ObjectHelper.isObject(valorOriginal) &&
        ObjectHelper.isObject(valorAlterado)
      ) {
        const diferencaProfunda = ObjectHelper.diffObject(
          valorOriginal,
          valorAlterado
        );
        if (Object.keys(diferencaProfunda).length > 0)
          alteracoes[chave] = diferencaProfunda;
      } else if (valorOriginal !== valorAlterado) {
        alteracoes[chave] = valorAlterado;
        if (alteracoes[chave] == '') alteracoes[chave] = null;
      }
    });

    Object.keys(objetoOriginal).forEach((chave) => {
      if (!(chave in objetoComAlteracoes)) {
        alteracoes[chave] = undefined;
      }
    });

    if (!Object.keys(alteracoes).length) return false;

    return alteracoes;
  }

  static isArrayEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
        if (!ObjectHelper.isArrayEqual(arr1[i], arr2[i])) return false;
      } else if (
        ObjectHelper.isObject(arr1[i]) &&
        ObjectHelper.isObject(arr2[i])
      ) {
        if (!ObjectHelper.diffObject(arr1[i], arr2[i])) return false;
      } else if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
}
