export const errorDictionary = {
  PRODUCT_NOT_FOUND: { message: "Producto no encontrado", status: 404 },
  INVALID_PRODUCT_DATA: { message: "Datos de producto inválidos", status: 400 },
  CART_ADD_ERROR: {
    message: "Error al agregar producto al carrito",
    status: 500,
  },
  CART_CREATE_ERROR: {
    message: "Error al agregar carrito",
    status: 500,
  },
  CART_NOT_FOUND: { message: "Carrito no encontrado", status: 404 },
};

export const createErrorResponse = (res, errorCode) => {
  const errorDetails = errorDictionary[errorCode] || {
    message: "Error desconocido",
    status: 500,
  };
  const { message, status } = errorDetails;
  createResponse(res, status, { error: message });
};

export const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};
