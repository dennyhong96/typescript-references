const generateId = (type: "todos") =>
  type + "_" + Math.random().toString(36).substr(2, 9);

export default generateId;
