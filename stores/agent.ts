import { defineStore } from 'pinia';
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { World } from "../modules/vircadia-world-sdk-ts/shared/modules/vircadia-world-meta/typescript/meta";

interface WorldConnection {
  supabaseClient: SupabaseClient;
  worldUrl: string;
  worldKey: string;
  worldSeed: World.I_Entity | null;
}

interface AgentState {
  world: WorldConnection | null;
  localAudioMediaStream: MediaStream | null;
  agentId: string | null;
  useWebRTC: boolean;
  useWebAudio: boolean;
  debugMode: boolean;
  iceServers: RTCIceServer[];
}

const log = console.log;

export const useAgentStore = defineStore('agent', {
  state: (): AgentState => ({
    world: null,
    localAudioMediaStream: null,
    agentId: null,
    useWebRTC: false,
    useWebAudio: false,
    debugMode: false,
    iceServers: [],
  }),

  actions: {
    setLocalAudioMediaStream(stream: MediaStream | null) {
      this.localAudioMediaStream = stream;
    },
    setAgentId(id: string | null) {
      this.agentId = id;
    },
    setUseWebRTC(use: boolean) {
      this.useWebRTC = use;
    },
    setUseWebAudio(use: boolean) {
      this.useWebAudio = use;
    },
    setDebugMode(debug: boolean) {
      this.debugMode = debug;
    },
    setIceServers(servers: RTCIceServer[]) {
      this.iceServers = servers;
    },
    async connectToWorld(data: {
        url: string,
        key: string,
    }) {
      try {
        if (this.world) {
          await this.disconnectFromWorld();
        }
        
        const worldUrl = data.url;
        const worldKey = data.key;
        
        log({
          message: `Initializing Supabase client at [${worldUrl}], with key [${worldKey}], key length: [${worldKey.length}]`,
          type: "info",
        });
        
        const supabaseClient = createClient(worldUrl, worldKey);
        supabaseClient.realtime.connect();
        
        log({
          message: "Connected to world successfully",
          type: "info",
        });

        // Fetch the seed entity
        const { data: seedEntity, error } = await supabaseClient
          .from(World.E_Table.ENTITIES)
          .select('*')
          .eq('general__name', World.Seed.DEFAULT_SEED_NAME)
          .single();

        if (error) {
          throw new Error(`Failed to fetch seed entity: ${error.message}`);
        }

        if (!seedEntity) {
          throw new Error('Seed entity not found');
        }

        this.world = {
          supabaseClient,
          worldUrl,
          worldKey,
          worldSeed: seedEntity as World.I_Entity,
        };

        log({
          message: "Seed entity fetched and added to world object",
          type: "info",
        });
      } catch (error) {
        log({
          message: `Error connecting to world: ${error}`,
          type: "error",
        });
        throw error;
      }
    },
    async disconnectFromWorld() {
      if (this.world) {
        try {
          log({
            message: `Deinitializing Supabase client`,
            type: "info",
          });
          
          this.world.supabaseClient.realtime.disconnect();
          await this.world.supabaseClient.removeAllChannels();
          
          this.world = null;
          
          log({
            message: `Disconnected from world successfully`,
            type: "info",
          });
        } catch (error) {
          log({
            message: `Error disconnecting from world: ${error}`,
            type: "error",
          });
          throw error;
        }
      }
    },
  },
});
