import updateRoles from '../services/roleService';
import * as userservice from '../services/userService';

const updatingRoles = async (req, res) => {
  try {
    const { userEmail, userRole } = req.body;
    const userToAssignRole = await userservice.findUserByEmail(userEmail);
    if (!userToAssignRole) {
      return res.status(400).json({
        success: false,
        message: 'The user to assign role does not exists.',
      });
    }
    if (userToAssignRole.role !== 'admin') {
      await updateRoles(userEmail, userRole);
    }
    return res.status(201).json({
      success: true,
      message: 'User role successfully updated!',
    });
  } catch (error) {
    console.log(error);
  }
};
export default updatingRoles;
