export function useCustomLoading(qInstance) {
  const showLoading = () => {
    qInstance.loading.show({
      message: 'Carregando...',
      customClass: 'custom-loading',
    });
  };

  const hideLoading = () => {
    qInstance.loading.hide();
  };

  return { showLoading, hideLoading };
}
