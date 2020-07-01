import { notification } from 'antd';

// import { Container } from './styles';

export default function notificationDefault(type, message, description) {
  notification[type]({
    message,
    description,
  });
}
