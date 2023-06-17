import { Avatar, Popover } from 'antd';

const UserInfo = ({ user }) => (
    <Popover
        content={
            <>
                <div>id: {user.id}</div>
                <div>Name: {user.name}</div>
            </>
        }
    >
        <Avatar style={{
          verticalAlign: 'middle',
        }}
        size="large">{user.name}</Avatar>
    </Popover>
);
export default UserInfo