import { UserOutlined } from '@ant-design/icons';
import { Avatar, Segmented, Space, DatePicker } from 'antd';
import { API_URL } from '../configs/config'
import { colorFromId } from '../utils/utils'
import useFetch from '../utils/useFetch';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import WorkTableForTeam from './WorkTableForTeam';


const Team = () => {
    const { user } = useSelector((state) => state);
    const [teamMembers, setTeamMembers] = useState([])
    const [selectedMemberId, setSelectedMemberId] = useState(null)
    const [selectedMonth, setSelectedMonth] = useState(null)

    useFetch(`${API_URL}/team/member?team_id=${user.team_id}`, setTeamMembers)

    const onChangeMember = (value) => {
        setSelectedMemberId(value)
    };
    const onChangeMonth = (value) => {
        setSelectedMonth(value.format('YYYY-MM'))
    }
    return (
        <>
            <h1>{user.team_name}</h1>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Segmented
                    options={
                        teamMembers.map(member => {
                            return {
                                label: (
                                    <div
                                        style={{
                                            padding: 4,
                                        }}
                                    >
                                        <Avatar style={{
                                            verticalAlign: 'middle',
                                            background: colorFromId(member.id),
                                        }}
                                            size="large">{member.name}</Avatar>
                                        <div>{member.name}</div>
                                    </div>
                                ),
                                value: member.id,
                            }
                        })
                    }
                    onChange={onChangeMember}
                />
                <DatePicker onChange={onChangeMonth} picker="month" />
                {selectedMemberId && selectedMonth &&
                    <WorkTableForTeam user_id={selectedMemberId} selectedMonth={selectedMonth} />
                }
            </Space>
        </>
    )
}
export default Team