const sortedLastMessage = (a, b) => {
    aTimeStamp = a.message[0]?.timestamp || 0
    aTimeStamp = b.message[0]?.timestamp || 0

    return bTimestamp - aTimestamp
}

const combinedData = (friendAvatar, sortedLastMessage) => {
    return friendAvatar.map((friend) => {
      const lastMessageData = sortedLastMessage.find((chat) =>
        chat.chatters.includes(friend.name)
      );
      return {
        ...friend,
        lastMessage: lastMessageData ? lastMessageData.message : "",
      };
    });
  };

export {sortedLastMessage, combinedData}