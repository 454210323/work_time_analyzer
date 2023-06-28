import { colorFromId } from "../utils/utils";
import { Avatar} from 'antd';

const AvatarWithName=({name})=>{


    return(
        <Avatar
        style={{
          verticalAlign: "middle",
          background: colorFromId(name),
        }}
        size="large"
      >
        {name.substring(0,1)}
      </Avatar>
    )
}
export default AvatarWithName