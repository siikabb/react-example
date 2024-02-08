import {useUser} from '../hooks/apiHooks';
import {useForm} from '../hooks/formHooks';

const RegisterForm = () => {
  const {postUser} = useUser();

  const initValues = {username: '', email: '', password: ''};

  const doRegister = async () => {
    try {
      console.log(inputs);
      await postUser(inputs);
    } catch (error) {
      console.error('doRegister failed:', error);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues,
  );

  return (
    <>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            id="username"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
