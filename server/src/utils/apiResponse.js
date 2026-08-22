export function createSuccess(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data });
}

export function createPaginated(res, { docs, total, page, limit, pages }) {
  return res.status(200).json({
    success: true,
    data: docs,
    pagination: { total, page, limit, pages },
  });
}
