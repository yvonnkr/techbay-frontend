export const redirectUserBasedOnRole = (user, history) => {
  if (user && user.token) {
    user.role === "admin"
      ? history.push("/admin/dashboard")
      : history.push("/user/history");
  }
};
