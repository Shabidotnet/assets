export const showConsoleLogs = (key = null, value) => {
    try {
      if (__DEV__)
        console.log(
          key == null ? '' : key + '=> ',
          value == null ? 'Value Is Null' : JSON.stringify(value, null, 2),
        );
    } catch (error) {
      console.log(error);
    }
  };