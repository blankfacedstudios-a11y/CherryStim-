import { AccessToken } from "livekit-server-sdk";

interface TokenPayload {
  roomName: string;
  participantName: string;
  canPublish?: boolean;
  canSubscribe?: boolean;
}

export function createLiveKitToken({
  roomName,
  participantName,
  canPublish = false,
  canSubscribe = true
}: TokenPayload) {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("Missing LiveKit credentials.");
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName
  });
  at.addGrant({ roomJoin: true, room: roomName, canPublish, canSubscribe });
  return at.toJwt();
}
