exports.isClient = () => {
  if (typeof window != "undefined") return true;
  else return false;
};
