import { PluginService } from "."

const userService = PluginService('/users')

class UserService {
  static uploadImage(data: FormData) {
    return userService({
      url: '/upload-file',
      method: 'POST',
      data
    })
  }

  static validateInput(data: any) {
    return userService({
      url: '/validate',
      method: 'POST',
      data
    })
  }
}

export default UserService