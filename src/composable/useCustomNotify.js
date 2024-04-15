export function useCustomNotify(qInstance) {
  const notifySuccess = (message) => {
    qInstance.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'done',
      message: message,
    });
  };

  const notifyError = (message) => {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: message,
    });
  };
  return { notifySuccess, notifyError };
}
