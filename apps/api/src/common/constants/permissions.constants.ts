/**
 * Nested permissions object to be used in code (e.g., in guards, controllers, decorators).
 */
export const Permissions = {
  Administration: {
    Default: 'Pages.Administration',
    Users: {
      Default: 'Pages.Administration.Users',
      Create: 'Pages.Administration.Users.Create',
      Update: 'Pages.Administration.Users.Update',
      Delete: 'Pages.Administration.Users.Delete',
    },
  },
  Products: {
    Default: 'Pages.Products',
    List: 'Pages.Products.List',
    Create: 'Pages.Products.Create',
    Update: 'Pages.Products.Update',
    Delete: 'Pages.Products.Delete',
  },
};

/**
 * Human-readable display names for permissions.
 */
export const PermissionDisplayNames: Record<string, string> = {
  'Pages.Administration': 'Quản trị hệ thống',
  'Pages.Administration.Users': 'Quản lý người dùng',
  'Pages.Administration.Users.Create': 'Thêm mới người dùng',
  'Pages.Administration.Users.Update': 'Chỉnh sửa người dùng',
  'Pages.Administration.Users.Delete': 'Xóa người dùng',
  'Pages.Products': 'Quản lý sản phẩm',
  'Pages.Products.List': 'Xem danh sách sản phẩm',
  'Pages.Products.Create': 'Thêm mới sản phẩm',
  'Pages.Products.Update': 'Chỉnh sửa sản phẩm',
  'Pages.Products.Delete': 'Xóa sản phẩm',
};
