const loadState = () => {
  try {
    const serializedState = localStorage.getItem("CART");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export default loadState;
