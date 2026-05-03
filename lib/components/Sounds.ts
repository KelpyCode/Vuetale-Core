
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ButtonSounds, DropdownBoxSounds } from "vuetale/types/elements";
import type { NATIVE } from "vuetale/types/elements";
import { defineComponent, h, resolveComponent, type PropType } from "vue";
import type { DefineComponent, PublicProps, SlotsType, VNode } from "vue";
type C<P, S extends Record<string, (...args: any[]) => VNode[]> = Record<never, never>> = DefineComponent<P, {}, {}, {}, {}, {}, {}, {}, string, PublicProps, Readonly<P>, {}, SlotsType<S>>;

export const Vars = {
    ButtonsMainActivate: (): string => "Sounds/ButtonsMainActivate.ogg",
    ButtonsMainHover: (): string => "Sounds/ButtonsMainHover.ogg",
    ButtonsMain: (): ButtonSounds => ({ "Activate": { "SoundPath": Vars.ButtonsMainActivate(), "Volume": 6 }, "MouseHover": { "SoundPath": Vars.ButtonsMainHover(), "MinPitch": -(0.1), "MaxPitch": 0.1, "Volume": 2 } }),
    ButtonsLightActivate: (): string => "Sounds/ButtonsLightActivate.ogg",
    ButtonsLightHover: (): string => "Sounds/ButtonsLightHover.ogg",
    ButtonsLight: (): ButtonSounds => ({ "Activate": { "SoundPath": Vars.ButtonsLightActivate(), "MinPitch": -(0.4), "MaxPitch": 0.4, "Volume": 4 }, "MouseHover": { "SoundPath": Vars.ButtonsLightHover(), "Volume": 6 } }),
    ButtonsCancelActivate: (): string => "Sounds/ButtonsCancelActivate.ogg",
    ButtonsCancel: (): ButtonSounds => ({ "Activate": { "SoundPath": Vars.ButtonsCancelActivate(), "MinPitch": -(0.4), "MaxPitch": 0.4, "Volume": 6 }, "MouseHover": { "SoundPath": Vars.ButtonsLightHover(), "Volume": 6 } }),
    CosmeticsTilesActivate: (): string => "Sounds/CosmeticsTilesActivate.ogg",
    CosmeticsTiles: (): ButtonSounds => ({ "Activate": { "SoundPath": Vars.CosmeticsTilesActivate(), "MinPitch": -(0.4), "MaxPitch": 0.4, "Volume": 6 }, "MouseHover": { "SoundPath": Vars.ButtonsLightHover(), "Volume": 6 } }),
    DropdownBox: (): DropdownBoxSounds => ({ "Activate": { "SoundPath": Vars.Tick(), "Volume": 6 }, "MouseHover": { "SoundPath": Vars.ButtonsLightHover(), "Volume": 6 }, "Close": { "SoundPath": Vars.ButtonsCancelActivate(), "Volume": 6 } }),
    EnterWorldActivate: (): string => "Sounds/EnterWorldActivate.ogg",
    EnterWorld: (): ButtonSounds => ({ "Activate": { "SoundPath": Vars.EnterWorldActivate(), "Volume": 6 }, "MouseHover": { "SoundPath": Vars.ButtonsLightHover(), "Volume": 6 }, "Context": { "SoundPath": Vars.ButtonsLightActivate(), "Volume": 6 } }),
    FriendsList: (): {} => ({}),
    HButtonHover: (): string => "Sounds/HButtonHover.ogg",
    Lock: (): ButtonSounds => ({ "Activate": { "SoundPath": "Sounds/LockActivate.ogg", "Volume": 6 } }),
    Unlock: (): ButtonSounds => ({ "Activate": { "SoundPath": "Sounds/UnlockActivate.ogg", "Volume": 6 } }),
    SaveActivate: (): string => "Sounds/SaveActivate.ogg",
    SaveSettings: (): ButtonSounds => ({ "Activate": { "SoundPath": Vars.SaveActivate(), "Volume": 6 }, "MouseHover": { "SoundPath": Vars.ButtonsLightHover(), "Volume": 6 } }),
    Respawn: (): string => "Sounds/Respawn_Stereo.ogg",
    RespawnActivate: (): ButtonSounds => ({ "Activate": { "SoundPath": Vars.Respawn(), "Volume": -(6) } }),
    ServerList: (): ButtonSounds => ({ "Activate": { "SoundPath": Vars.EnterWorldActivate(), "Volume": 6 }, "MouseHover": { "SoundPath": Vars.ButtonsLightHover(), "Volume": 6 } }),
    ShuffleActivate: (): string => "Sounds/ShuffleActivate.ogg",
    Shuffle: (): ButtonSounds => ({ "Activate": { "SoundPath": Vars.ShuffleActivate(), "MinPitch": -(0.4), "MaxPitch": 0.4, "Volume": 1 } }),
    Tick: (): string => "Sounds/TickActivate.ogg",
    Untick: (): string => "Sounds/UntickActivate.ogg",
    TopBarActivate: (): string => "Sounds/TopBarActivate.ogg",
    TopBar: (): ButtonSounds => ({ "Activate": { "SoundPath": Vars.TopBarActivate(), "Volume": 6 }, "MouseHover": { "SoundPath": Vars.ButtonsMainHover(), "Volume": 2 } })
};

