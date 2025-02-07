import { PrettyChatWindow } from "react-chat-engine-pretty";


const ChatsPage = ({data}) => {
  return (
    <div style={{height:'100vh'}}>
      <PrettyChatWindow
        projectId='9af8b4ef-a736-415e-8f78-2c2b77a8754f'
        username={data} // adam
        secret='secret' // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatsPage;
