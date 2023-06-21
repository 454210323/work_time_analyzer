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
    const [selectedMemberId, setSelectedMemberId] = useState('all_users')
    const [selectedMonth, setSelectedMonth] = useState(null)

    useFetch(`${API_URL}/team/member?team_id=${user.team_id}`, setTeamMembers)

    const onChangeMember = (value) => {
        setSelectedMemberId(value)
    };
    const onChangeMonth = (value) => {
        setSelectedMonth(value.format('YYYY-MM'))
    }

    const segmentedOptoins = () => {
        const Optoins = [
            {
                label: (
                    <div
                        style={{
                            padding: 4,
                        }}
                    >
                        <Avatar style={{
                            verticalAlign: 'middle',
                            background: colorFromId("all_users"),
                        }}
                            size="large">All Users</Avatar>
                        <div>All Users</div>
                    </div>
                ),
                value: "all_users",
            }
        ].concat(
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
            }))
        return Optoins
    }

    return (
        <>
            <h1>{user.team_name}</h1>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Segmented
                    options={segmentedOptoins()}
                    onChange={onChangeMember}
                />
                <DatePicker onChange={onChangeMonth} picker="month" />
                {selectedMemberId && selectedMonth &&
                    <WorkTableForTeam user_id={selectedMemberId === 'all_users' ? null : selectedMemberId} selectedMonth={selectedMonth} />
                }
            </Space>
        </>
    )
}
export default Team