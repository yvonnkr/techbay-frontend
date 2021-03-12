export const redirectUserBasedOnRole = (user, history) => {
  if (user && user.token) {
    user.isAdmin
      ? history.push("/admin/dashboard")
      : history.push("/user/history");
  }
};
