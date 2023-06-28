import { Popover, Descriptions, Typography, Space } from 'antd';
import AvatarWithName from "./AvatarWithName";

const { Text } = Typography;

const UserInfo = ({ user }) => (
    <Space>

        <Popover
            content={
                <>
                    <Text>id: {user.id}</Text>
                    <br />
                    <Text>Name: {user.name}</Text>
                    <br />
                    <Text>Team: {user.team_name}</Text>
                </>
            }
        >
            <AvatarWithName name={user.name} />
        </Popover>
        <Descriptions bordered>
            <Descriptions.Item label="UserName">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Team">{user.team_name}</Descriptions.Item>
        </Descriptions>
    </Space>
);
export default UserInfo