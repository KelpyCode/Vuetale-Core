/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable vue/multi-word-component-names */
import type { NATIVE } from "@/types/global";
import { defineComponent, h, type PropType } from "vue";
import type { DefineComponent, PublicProps, SlotsType, VNode } from "vue";

type C<P, S extends Record<string, (...args: any[]) => VNode[]> = Record<never, never>> = DefineComponent<P, {}, {}, {}, {}, {}, {}, {}, string, PublicProps, Readonly<P>, {}, SlotsType<S>>;

type PanelCustomProps = {

};
type PanelProps = PanelCustomProps & Partial<NATIVE["Group"]>;
type PanelSlots = {

};

const Panel = defineComponent({
    name: "Panel",
    slots: Object as SlotsType<PanelSlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as PanelProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "background": { "TexturePath": "Common/ContainerFullPatch.png", "Border": 20 } } });
    },
}) as C<PanelProps, PanelSlots>;

type TitleLabelCustomProps = {

};
type TitleLabelProps = TitleLabelCustomProps & Partial<NATIVE["Label"]>;
type TitleLabelSlots = {

};

const TitleLabel = defineComponent({
    name: "TitleLabel",
    slots: Object as SlotsType<TitleLabelSlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as TitleLabelProps & Record<string, unknown>;
        return () => h("Label", { ...nativeProps, ...{ "elStyle": { "FontSize": 40, "Alignment": "Center" } } });
    },
}) as C<TitleLabelProps, TitleLabelSlots>;

type TextButtonCustomProps = {
    sounds?: {};
    anchor?: { Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number };
    text?: unknown;
};
type TextButtonProps = TextButtonCustomProps & Partial<NATIVE["TextButton"]>;
type TextButtonSlots = {

};

const TextButton = defineComponent({
    name: "TextButton",
    slots: Object as SlotsType<TextButtonSlots>,
    props: {
        sounds: {
            type: Object as PropType<{}>,
            default: () => ({}),
        },
        anchor: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number }>,
            default: () => ({}),
        },
        text: { type: null, required: false }
    },
    setup(props, { slots }) {
        const { sounds, anchor, text, ...nativeProps } = props as TextButtonProps & Record<string, unknown>;
        return () => h("TextButton", { ...nativeProps, ...{ "elStyle": { "Default": { "Background": { "TexturePath": "Common/Buttons/Primary.png", "VerticalBorder": 12, "HorizontalBorder": 80 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bfcdd5", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Hovered": { "Background": { "TexturePath": "Common/Buttons/Primary_Hovered.png", "VerticalBorder": 12, "HorizontalBorder": 80 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bfcdd5", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Pressed": { "Background": { "TexturePath": "Common/Buttons/Primary_Pressed.png", "VerticalBorder": 12, "HorizontalBorder": 80 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bfcdd5", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Disabled": { "Background": { "TexturePath": "Common/Buttons/Disabled.png", "VerticalBorder": 12, "HorizontalBorder": 80 }, "LabelStyle": { "FontSize": 17, "TextColor": "#797b7c", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Sounds": props.sounds }, "anchor": props.anchor, "padding": { "Horizontal": 24 }, "text": props.text } });
    },
}) as C<TextButtonProps, TextButtonSlots>;

type ButtonCustomProps = {
    defaultSquareButtonStyle?: unknown;
    sounds?: {};
    anchor?: { Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number };
};
type ButtonProps = ButtonCustomProps & Partial<NATIVE["Button"]>;
type ButtonSlots = {

};

const Button = defineComponent({
    name: "Button",
    slots: Object as SlotsType<ButtonSlots>,
    props: {
        defaultSquareButtonStyle: { type: null, required: false },
        sounds: {
            type: Object as PropType<{}>,
            default: () => ({}),
        },
        anchor: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number }>,
            default: () => ({}),
        }
    },
    setup(props, { slots }) {
        const { defaultSquareButtonStyle, sounds, anchor, ...nativeProps } = props as ButtonProps & Record<string, unknown>;
        return () => h("Button", { ...nativeProps, ...{ "elStyle": props.defaultSquareButtonStyle, "anchor": props.anchor, "padding": { "Horizontal": 24 } } });
    },
}) as C<ButtonProps, ButtonSlots>;

type CancelTextButtonCustomProps = {
    sounds?: {};
    anchor?: { Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number };
    text?: unknown;
};
type CancelTextButtonProps = CancelTextButtonCustomProps & Partial<NATIVE["TextButton"]>;
type CancelTextButtonSlots = {

};

const CancelTextButton = defineComponent({
    name: "CancelTextButton",
    slots: Object as SlotsType<CancelTextButtonSlots>,
    props: {
        sounds: {
            type: Object as PropType<{}>,
            default: () => ({}),
        },
        anchor: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number }>,
            default: () => ({}),
        },
        text: { type: null, required: false }
    },
    setup(props, { slots }) {
        const { sounds, anchor, text, ...nativeProps } = props as CancelTextButtonProps & Record<string, unknown>;
        return () => h("TextButton", { ...nativeProps, ...{ "elStyle": { "Default": { "Background": { "TexturePath": "Common/Buttons/Destructive.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bfcdd5", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Hovered": { "Background": { "TexturePath": "Common/Buttons/Destructive_Hovered.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bfcdd5", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Pressed": { "Background": { "TexturePath": "Common/Buttons/Destructive_Pressed.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bfcdd5", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Disabled": { "Background": { "TexturePath": "Common/Buttons/Disabled.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bfcdd5", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Sounds": props.sounds }, "anchor": props.anchor, "padding": { "Horizontal": 24 }, "text": props.text } });
    },
}) as C<CancelTextButtonProps, CancelTextButtonSlots>;

type CancelButtonCustomProps = {
    sounds?: {};
    anchor?: { Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number };
    width?: number;
};
type CancelButtonProps = CancelButtonCustomProps & Partial<NATIVE["Button"]>;
type CancelButtonSlots = {

};

const CancelButton = defineComponent({
    name: "CancelButton",
    slots: Object as SlotsType<CancelButtonSlots>,
    props: {
        sounds: {
            type: Object as PropType<{}>,
            default: () => ({}),
        },
        anchor: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number }>,
            default: () => ({}),
        },
        width: {
            type: Number,
            default: 44,
        }
    },
    setup(props, { slots }) {
        const { sounds, anchor, width, ...nativeProps } = props as CancelButtonProps & Record<string, unknown>;
        return () => h("Button", { ...nativeProps, ...{ "elStyle": { "Default": { "Background": { "TexturePath": "Common/Buttons/Destructive.png", "Border": 12 } }, "Hovered": { "Background": { "TexturePath": "Common/Buttons/Destructive_Hovered.png", "Border": 12 } }, "Pressed": { "Background": { "TexturePath": "Common/Buttons/Destructive_Pressed.png", "Border": 12 } }, "Disabled": { "Background": { "TexturePath": "Common/Buttons/Disabled.png", "Border": 12 } }, "Sounds": props.sounds }, "anchor": props.anchor } });
    },
}) as C<CancelButtonProps, CancelButtonSlots>;

type SmallSecondaryTextButtonCustomProps = {
    sounds?: {};
    anchor?: { Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number };
    text?: unknown;
};
type SmallSecondaryTextButtonProps = SmallSecondaryTextButtonCustomProps & Partial<NATIVE["TextButton"]>;
type SmallSecondaryTextButtonSlots = {

};

const SmallSecondaryTextButton = defineComponent({
    name: "SmallSecondaryTextButton",
    slots: Object as SlotsType<SmallSecondaryTextButtonSlots>,
    props: {
        sounds: {
            type: Object as PropType<{}>,
            default: () => ({}),
        },
        anchor: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number }>,
            default: () => ({}),
        },
        text: { type: null, required: false }
    },
    setup(props, { slots }) {
        const { sounds, anchor, text, ...nativeProps } = props as SmallSecondaryTextButtonProps & Record<string, unknown>;
        return () => h("TextButton", { ...nativeProps, ...{ "elStyle": { "Default": { "Background": { "TexturePath": "Common/Buttons/Secondary.png", "Border": 12 }, "LabelStyle": { "FontSize": 14, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Hovered": { "Background": { "TexturePath": "Common/Buttons/Secondary_Hovered.png", "Border": 12 }, "LabelStyle": { "FontSize": 14, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Pressed": { "Background": { "TexturePath": "Common/Buttons/Secondary_Pressed.png", "Border": 12 }, "LabelStyle": { "FontSize": 14, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Disabled": { "Background": { "TexturePath": "Common/Buttons/Disabled.png", "Border": 12 }, "LabelStyle": { "FontSize": 14, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Sounds": props.sounds }, "anchor": props.anchor, "padding": { "Horizontal": 16 }, "text": props.text } });
    },
}) as C<SmallSecondaryTextButtonProps, SmallSecondaryTextButtonSlots>;

type SmallTertiaryTextButtonCustomProps = {
    sounds?: {};
    anchor?: { Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number };
    text?: unknown;
};
type SmallTertiaryTextButtonProps = SmallTertiaryTextButtonCustomProps & Partial<NATIVE["TextButton"]>;
type SmallTertiaryTextButtonSlots = {

};

const SmallTertiaryTextButton = defineComponent({
    name: "SmallTertiaryTextButton",
    slots: Object as SlotsType<SmallTertiaryTextButtonSlots>,
    props: {
        sounds: {
            type: Object as PropType<{}>,
            default: () => ({}),
        },
        anchor: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number }>,
            default: () => ({}),
        },
        text: { type: null, required: false }
    },
    setup(props, { slots }) {
        const { sounds, anchor, text, ...nativeProps } = props as SmallTertiaryTextButtonProps & Record<string, unknown>;
        return () => h("TextButton", { ...nativeProps, ...{ "elStyle": { "Default": { "Background": { "TexturePath": "Common/Buttons/Tertiary.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Hovered": { "Background": { "TexturePath": "Common/Buttons/Tertiary_Hovered.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Pressed": { "Background": { "TexturePath": "Common/Buttons/Tertiary_Pressed.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Disabled": { "Background": { "TexturePath": "Common/Buttons/Disabled.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Sounds": props.sounds }, "anchor": props.anchor, "padding": { "Horizontal": 16 }, "text": props.text } });
    },
}) as C<SmallTertiaryTextButtonProps, SmallTertiaryTextButtonSlots>;

type SecondaryTextButtonCustomProps = {
    sounds?: {};
    anchor?: { Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number };
    text?: unknown;
};
type SecondaryTextButtonProps = SecondaryTextButtonCustomProps & Partial<NATIVE["TextButton"]>;
type SecondaryTextButtonSlots = {

};

const SecondaryTextButton = defineComponent({
    name: "SecondaryTextButton",
    slots: Object as SlotsType<SecondaryTextButtonSlots>,
    props: {
        sounds: {
            type: Object as PropType<{}>,
            default: () => ({}),
        },
        anchor: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number }>,
            default: () => ({}),
        },
        text: { type: null, required: false }
    },
    setup(props, { slots }) {
        const { sounds, anchor, text, ...nativeProps } = props as SecondaryTextButtonProps & Record<string, unknown>;
        return () => h("TextButton", { ...nativeProps, ...{ "elStyle": { "Default": { "Background": { "TexturePath": "Common/Buttons/Secondary.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Hovered": { "Background": { "TexturePath": "Common/Buttons/Secondary_Hovered.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Pressed": { "Background": { "TexturePath": "Common/Buttons/Secondary_Pressed.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Disabled": { "Background": { "TexturePath": "Common/Buttons/Disabled.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Sounds": props.sounds }, "anchor": props.anchor, "padding": { "Horizontal": 24 }, "text": props.text } });
    },
}) as C<SecondaryTextButtonProps, SecondaryTextButtonSlots>;

type SecondaryButtonCustomProps = {
    sounds?: {};
    anchor?: { Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number };
    width?: number;
};
type SecondaryButtonProps = SecondaryButtonCustomProps & Partial<NATIVE["Button"]>;
type SecondaryButtonSlots = {

};

const SecondaryButton = defineComponent({
    name: "SecondaryButton",
    slots: Object as SlotsType<SecondaryButtonSlots>,
    props: {
        sounds: {
            type: Object as PropType<{}>,
            default: () => ({}),
        },
        anchor: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number }>,
            default: () => ({}),
        },
        width: {
            type: Number,
            default: 44,
        }
    },
    setup(props, { slots }) {
        const { sounds, anchor, width, ...nativeProps } = props as SecondaryButtonProps & Record<string, unknown>;
        return () => h("Button", { ...nativeProps, ...{ "elStyle": { "Default": { "Background": { "TexturePath": "Common/Buttons/Secondary.png", "Border": 12 } }, "Hovered": { "Background": { "TexturePath": "Common/Buttons/Secondary_Hovered.png", "Border": 12 } }, "Pressed": { "Background": { "TexturePath": "Common/Buttons/Secondary_Pressed.png", "Border": 12 } }, "Disabled": { "Background": { "TexturePath": "Common/Buttons/Disabled.png", "Border": 12 } }, "Sounds": props.sounds }, "anchor": props.anchor } });
    },
}) as C<SecondaryButtonProps, SecondaryButtonSlots>;

type TertiaryTextButtonCustomProps = {
    sounds?: {};
    anchor?: { Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number };
    text?: unknown;
};
type TertiaryTextButtonProps = TertiaryTextButtonCustomProps & Partial<NATIVE["TextButton"]>;
type TertiaryTextButtonSlots = {

};

const TertiaryTextButton = defineComponent({
    name: "TertiaryTextButton",
    slots: Object as SlotsType<TertiaryTextButtonSlots>,
    props: {
        sounds: {
            type: Object as PropType<{}>,
            default: () => ({}),
        },
        anchor: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number }>,
            default: () => ({}),
        },
        text: { type: null, required: false }
    },
    setup(props, { slots }) {
        const { sounds, anchor, text, ...nativeProps } = props as TertiaryTextButtonProps & Record<string, unknown>;
        return () => h("TextButton", { ...nativeProps, ...{ "elStyle": { "Default": { "Background": { "TexturePath": "Common/Buttons/Tertiary.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Hovered": { "Background": { "TexturePath": "Common/Buttons/Tertiary_Hovered.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Pressed": { "Background": { "TexturePath": "Common/Buttons/Tertiary_Pressed.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Disabled": { "Background": { "TexturePath": "Common/Buttons/Disabled.png", "Border": 12 }, "LabelStyle": { "FontSize": 17, "TextColor": "#bdcbd3", "RenderBold": true, "RenderUppercase": true, "HorizontalAlignment": "Center", "VerticalAlignment": "Center" } }, "Sounds": props.sounds }, "anchor": props.anchor, "padding": { "Horizontal": 24 }, "text": props.text } });
    },
}) as C<TertiaryTextButtonProps, TertiaryTextButtonSlots>;

type TertiaryButtonCustomProps = {
    sounds?: {};
    anchor?: { Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number };
    width?: number;
};
type TertiaryButtonProps = TertiaryButtonCustomProps & Partial<NATIVE["Button"]>;
type TertiaryButtonSlots = {

};

const TertiaryButton = defineComponent({
    name: "TertiaryButton",
    slots: Object as SlotsType<TertiaryButtonSlots>,
    props: {
        sounds: {
            type: Object as PropType<{}>,
            default: () => ({}),
        },
        anchor: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number }>,
            default: () => ({}),
        },
        width: {
            type: Number,
            default: 44,
        }
    },
    setup(props, { slots }) {
        const { sounds, anchor, width, ...nativeProps } = props as TertiaryButtonProps & Record<string, unknown>;
        return () => h("Button", { ...nativeProps, ...{ "elStyle": { "Default": { "Background": { "TexturePath": "Common/Buttons/Tertiary.png", "Border": 12 } }, "Hovered": { "Background": { "TexturePath": "Common/Buttons/Tertiary_Hovered.png", "Border": 12 } }, "Pressed": { "Background": { "TexturePath": "Common/Buttons/Tertiary_Pressed.png", "Border": 12 } }, "Disabled": { "Background": { "TexturePath": "Common/Buttons/Disabled.png", "Border": 12 } }, "Sounds": props.sounds }, "anchor": props.anchor } });
    },
}) as C<TertiaryButtonProps, TertiaryButtonSlots>;

type CloseButtonCustomProps = {

};
type CloseButtonProps = CloseButtonCustomProps & Partial<NATIVE["Button"]>;
type CloseButtonSlots = {

};

const CloseButton = defineComponent({
    name: "CloseButton",
    slots: Object as SlotsType<CloseButtonSlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as CloseButtonProps & Record<string, unknown>;
        return () => h("Button", { ...nativeProps, ...{ "anchor": { "Top": -16, "Right": -16, "Width": 32, "Height": 32 }, "elStyle": { "Default": { "Background": "Common/ContainerCloseButton.png" }, "Hovered": { "Background": "Common/ContainerCloseButtonHovered.png" }, "Pressed": { "Background": "Common/ContainerCloseButtonPressed.png" } } } });
    },
}) as C<CloseButtonProps, CloseButtonSlots>;

type CheckBoxCustomProps = {

};
type CheckBoxProps = CheckBoxCustomProps & Partial<NATIVE["CheckBox"]>;
type CheckBoxSlots = {

};

const CheckBox = defineComponent({
    name: "CheckBox",
    slots: Object as SlotsType<CheckBoxSlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as CheckBoxProps & Record<string, unknown>;
        return () => h("CheckBox", { ...nativeProps, ...{ "anchor": { "Width": 22, "Height": 22 }, "background": { "TexturePath": "Common/CheckBoxFrame.png", "Border": 7 }, "padding": { "Full": 4 }, "elStyle": { "Unchecked": { "DefaultBackground": { "Color": "#00000000" }, "HoveredBackground": { "Color": "#00000000" }, "PressedBackground": { "Color": "#00000000" }, "DisabledBackground": { "Color": "#424242" }, "ChangedSound": { "SoundPath": "Sounds/UntickActivate.ogg", "Volume": 6 } }, "Checked": { "DefaultBackground": { "TexturePath": "Common/Checkmark.png" }, "HoveredBackground": { "TexturePath": "Common/Checkmark.png" }, "PressedBackground": { "TexturePath": "Common/Checkmark.png" }, "ChangedSound": { "SoundPath": "Sounds/TickActivate.ogg", "Volume": 6 } } } } });
    },
}) as C<CheckBoxProps, CheckBoxSlots>;

type CheckBoxWithLabelCustomProps = {
    checked?: boolean;
    text?: unknown;
};
type CheckBoxWithLabelProps = CheckBoxWithLabelCustomProps & Partial<NATIVE["Group"]>;
type CheckBoxWithLabelSlots = {

};

const CheckBoxWithLabel = defineComponent({
    name: "CheckBoxWithLabel",
    slots: Object as SlotsType<CheckBoxWithLabelSlots>,
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
        text: { type: null, required: false }
    },
    setup(props, { slots }) {
        const { checked, text, ...nativeProps } = props as CheckBoxWithLabelProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "layoutMode": "Left" } }, [
            h("CheckBox", { "anchor": { "Width": 22, "Height": 22 }, "background": { "TexturePath": "Common/CheckBoxFrame.png", "Border": 7 }, "padding": { "Full": 4 }, "elStyle": { "Unchecked": { "DefaultBackground": { "Color": "#00000000" }, "HoveredBackground": { "Color": "#00000000" }, "PressedBackground": { "Color": "#00000000" }, "DisabledBackground": { "Color": "#424242" }, "ChangedSound": { "SoundPath": "Sounds/UntickActivate.ogg", "Volume": 6 } }, "Checked": { "DefaultBackground": { "TexturePath": "Common/Checkmark.png" }, "HoveredBackground": { "TexturePath": "Common/Checkmark.png" }, "PressedBackground": { "TexturePath": "Common/Checkmark.png" }, "ChangedSound": { "SoundPath": "Sounds/TickActivate.ogg", "Volume": 6 } } }, "value": props.checked, "id": "CheckBox" }),
            h("Label", { "text": props.text, "anchor": { "Right": 30, "Left": 11 }, "elStyle": { "FontSize": 16, "TextColor": "#96a9be", "VerticalAlignment": "Center" } })
        ]);
    },
}) as C<CheckBoxWithLabelProps, CheckBoxWithLabelSlots>;

type TextFieldCustomProps = {
    anchor?: {};
};
type TextFieldProps = TextFieldCustomProps & Partial<NATIVE["TextField"]>;
type TextFieldSlots = {

};

const TextField = defineComponent({
    name: "TextField",
    slots: Object as SlotsType<TextFieldSlots>,
    props: {
        anchor: {
            type: Object as PropType<{}>,
            default: () => ({}),
        }
    },
    setup(props, { slots }) {
        const { anchor, ...nativeProps } = props as TextFieldProps & Record<string, unknown>;
        return () => h("TextField", { ...nativeProps, ...{ "elStyle": {}, "placeholderStyle": { "TextColor": "#6e7da1" }, "background": { "TexturePath": "Common/InputBox.png", "Border": 16 }, "anchor": props.anchor, "padding": { "Horizontal": 10 } } });
    },
}) as C<TextFieldProps, TextFieldSlots>;

type NumberFieldCustomProps = {
    anchor?: {};
};
type NumberFieldProps = NumberFieldCustomProps & Partial<NATIVE["NumberField"]>;
type NumberFieldSlots = {

};

const NumberField = defineComponent({
    name: "NumberField",
    slots: Object as SlotsType<NumberFieldSlots>,
    props: {
        anchor: {
            type: Object as PropType<{}>,
            default: () => ({}),
        }
    },
    setup(props, { slots }) {
        const { anchor, ...nativeProps } = props as NumberFieldProps & Record<string, unknown>;
        return () => h("NumberField", { ...nativeProps, ...{ "elStyle": {}, "placeholderStyle": { "TextColor": "#6e7da1" }, "background": { "TexturePath": "Common/InputBox.png", "Border": 16 }, "anchor": props.anchor, "padding": { "Horizontal": 10 } } });
    },
}) as C<NumberFieldProps, NumberFieldSlots>;

type DropdownBoxCustomProps = {
    anchor?: {};
};
type DropdownBoxProps = DropdownBoxCustomProps & Partial<NATIVE["DropdownBox"]>;
type DropdownBoxSlots = {

};

const DropdownBox = defineComponent({
    name: "DropdownBox",
    slots: Object as SlotsType<DropdownBoxSlots>,
    props: {
        anchor: {
            type: Object as PropType<{}>,
            default: () => ({}),
        }
    },
    setup(props, { slots }) {
        const { anchor, ...nativeProps } = props as DropdownBoxProps & Record<string, unknown>;
        return () => h("DropdownBox", { ...nativeProps, ...{ "anchor": props.anchor, "elStyle": { "DefaultBackground": { "TexturePath": "Common/Dropdown.png", "Border": 16 }, "HoveredBackground": { "TexturePath": "Common/DropdownHovered.png", "Border": 16 }, "PressedBackground": { "TexturePath": "Common/DropdownPressed.png", "Border": 16 }, "DefaultArrowTexturePath": "Common/DropdownCaret.png", "HoveredArrowTexturePath": "Common/DropdownCaret.png", "PressedArrowTexturePath": "Common/DropdownPressedCaret.png", "ArrowWidth": 13, "ArrowHeight": 18, "LabelStyle": { "TextColor": "#96a9be", "RenderUppercase": true, "VerticalAlignment": "Center", "FontSize": 13 }, "EntryLabelStyle": { "TextColor": "#b7cedd", "RenderUppercase": true, "VerticalAlignment": "Center", "FontSize": 13 }, "NoItemsLabelStyle": { "TextColor": "#b7cedd(0.5)", "RenderUppercase": true, "VerticalAlignment": "Center", "FontSize": 13 }, "SelectedEntryLabelStyle": { "TextColor": "#b7cedd", "RenderUppercase": true, "VerticalAlignment": "Center", "FontSize": 13, "RenderBold": true }, "HorizontalPadding": 8, "PanelScrollbarStyle": { "Spacing": 6, "Size": 6, "Background": { "TexturePath": "Common/Scrollbar.png", "Border": 3 }, "Handle": { "TexturePath": "Common/ScrollbarHandle.png", "Border": 3 }, "HoveredHandle": { "TexturePath": "Common/ScrollbarHandleHovered.png", "Border": 3 }, "DraggedHandle": { "TexturePath": "Common/ScrollbarHandleDragged.png", "Border": 3 } }, "PanelBackground": { "TexturePath": "Common/DropdownBox.png", "Border": 16 }, "PanelPadding": 6, "PanelAlign": "Right", "PanelOffset": 7, "EntryHeight": 31, "EntriesInViewport": 10, "HorizontalEntryPadding": 7, "HoveredEntryBackground": { "Color": "#0a0f17" }, "PressedEntryBackground": { "Color": "#0f1621" }, "Sounds": { "Activate": { "SoundPath": "Sounds/TickActivate.ogg", "Volume": 6 }, "MouseHover": { "SoundPath": "Sounds/ButtonsLightHover.ogg", "Volume": 6 }, "Close": { "SoundPath": "Sounds/ButtonsCancelActivate.ogg", "Volume": 6 } }, "EntrySounds": { "Activate": { "SoundPath": "Sounds/ButtonsLightActivate.ogg", "MinPitch": -0.4, "MaxPitch": 0.4, "Volume": 4 }, "MouseHover": { "SoundPath": "Sounds/ButtonsLightHover.ogg", "Volume": 6 } }, "FocusOutlineSize": 1, "FocusOutlineColor": "#ffffff(0.4)" } } });
    },
}) as C<DropdownBoxProps, DropdownBoxSlots>;

type ContentSeparatorCustomProps = {
    anchor?: { Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number };
};
type ContentSeparatorProps = ContentSeparatorCustomProps & Partial<NATIVE["Group"]>;
type ContentSeparatorSlots = {

};

const ContentSeparator = defineComponent({
    name: "ContentSeparator",
    slots: Object as SlotsType<ContentSeparatorSlots>,
    props: {
        anchor: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Height?: number; Horizontal?: number; Left?: number; MaxWidth?: number; MinWidth?: number; Right?: number; Top?: number; Vertical?: number; Width?: number }>,
            default: () => ({}),
        }
    },
    setup(props, { slots }) {
        const { anchor, ...nativeProps } = props as ContentSeparatorProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "anchor": props.anchor, "background": { "Color": "#2b3542" } } });
    },
}) as C<ContentSeparatorProps, ContentSeparatorSlots>;

type DefaultSpinnerCustomProps = {
    anchor?: {};
};
type DefaultSpinnerProps = DefaultSpinnerCustomProps & Partial<NATIVE["Sprite"]>;
type DefaultSpinnerSlots = {

};

const DefaultSpinner = defineComponent({
    name: "DefaultSpinner",
    slots: Object as SlotsType<DefaultSpinnerSlots>,
    props: {
        anchor: {
            type: Object as PropType<{}>,
            default: () => ({}),
        }
    },
    setup(props, { slots }) {
        const { anchor, ...nativeProps } = props as DefaultSpinnerProps & Record<string, unknown>;
        return () => h("Sprite", { ...nativeProps, ...{ "anchor": props.anchor, "texturePath": "Common/Spinner.png", "frame": { "Width": 32, "Height": 32, "PerRow": 8, "Count": 72 }, "framesPerSecond": 30 } });
    },
}) as C<DefaultSpinnerProps, DefaultSpinnerSlots>;

type ActionButtonContainerCustomProps = {

};
type ActionButtonContainerProps = ActionButtonContainerCustomProps & Partial<NATIVE["Group"]>;
type ActionButtonContainerSlots = {

};

const ActionButtonContainer = defineComponent({
    name: "ActionButtonContainer",
    slots: Object as SlotsType<ActionButtonContainerSlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as ActionButtonContainerProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "layoutMode": "Right", "anchor": { "Right": 50, "Bottom": 50, "Height": 27 } } });
    },
}) as C<ActionButtonContainerProps, ActionButtonContainerSlots>;

type ActionButtonSeparatorCustomProps = {

};
type ActionButtonSeparatorProps = ActionButtonSeparatorCustomProps & Partial<NATIVE["Group"]>;
type ActionButtonSeparatorSlots = {

};

const ActionButtonSeparator = defineComponent({
    name: "ActionButtonSeparator",
    slots: Object as SlotsType<ActionButtonSeparatorSlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as ActionButtonSeparatorProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "anchor": { "Width": 35 } } });
    },
}) as C<ActionButtonSeparatorProps, ActionButtonSeparatorSlots>;

type VerticalActionButtonSeparatorCustomProps = {

};
type VerticalActionButtonSeparatorProps = VerticalActionButtonSeparatorCustomProps & Partial<NATIVE["Group"]>;
type VerticalActionButtonSeparatorSlots = {

};

const VerticalActionButtonSeparator = defineComponent({
    name: "VerticalActionButtonSeparator",
    slots: Object as SlotsType<VerticalActionButtonSeparatorSlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as VerticalActionButtonSeparatorProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "anchor": { "Height": 20 } } });
    },
}) as C<VerticalActionButtonSeparatorProps, VerticalActionButtonSeparatorSlots>;

type SubtitleCustomProps = {
    text?: unknown;
};
type SubtitleProps = SubtitleCustomProps & Partial<NATIVE["Label"]>;
type SubtitleSlots = {

};

const Subtitle = defineComponent({
    name: "Subtitle",
    slots: Object as SlotsType<SubtitleSlots>,
    props: {
        text: { type: null, required: false }
    },
    setup(props, { slots }) {
        const { text, ...nativeProps } = props as SubtitleProps & Record<string, unknown>;
        return () => h("Label", { ...nativeProps, ...{ "elStyle": { "FontSize": 15, "RenderUppercase": true, "TextColor": "#96a9be" }, "text": props.text, "anchor": { "Bottom": 10 } } });
    },
}) as C<SubtitleProps, SubtitleSlots>;

type TitleCustomProps = {
    alignment?: string;
    text?: string;
};
type TitleProps = TitleCustomProps & Partial<NATIVE["Label"]>;
type TitleSlots = {

};

const Title = defineComponent({
    name: "Title",
    slots: Object as SlotsType<TitleSlots>,
    props: {
        alignment: {
            type: String,
            default: "Center",
        },
        text: {
            type: String,
            default: "",
        }
    },
    setup(props, { slots }) {
        const { alignment, text, ...nativeProps } = props as TitleProps & Record<string, unknown>;
        return () => h("Label", { ...nativeProps, ...{ "elStyle": { "FontSize": 15, "VerticalAlignment": "Center", "RenderUppercase": true, "TextColor": "#b4c8c9", "FontName": "Secondary", "RenderBold": true, "LetterSpacing": 0, "HorizontalAlignment": props.alignment }, "padding": { "Horizontal": 19 }, "text": props.text } });
    },
}) as C<TitleProps, TitleSlots>;

type HeaderSearchCustomProps = {
    marginRight?: number;
};
type HeaderSearchProps = HeaderSearchCustomProps & Partial<NATIVE["Group"]>;
type HeaderSearchSlots = {

};

const HeaderSearch = defineComponent({
    name: "HeaderSearch",
    slots: Object as SlotsType<HeaderSearchSlots>,
    props: {
        marginRight: {
            type: Number,
            default: 10,
        }
    },
    setup(props, { slots }) {
        const { marginRight, ...nativeProps } = props as HeaderSearchProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "anchor": { "Width": 200, "Right": 0 } } }, [
            h("CompactTextField", { "anchor": { "Height": 30, "Right": props.marginRight }, "collapsedWidth": 34, "expandedWidth": 200, "placeholderText": "%server.customUI.searchPlaceholder", "elStyle": { "FontSize": 16 }, "placeholderStyle": { "TextColor": "#3d5a85", "RenderUppercase": true, "FontSize": 14 }, "padding": { "Horizontal": 12, "Left": 34 }, "decoration": { "Default": { "Icon": { "Texture": "Common/SearchIcon.png", "Width": 16, "Height": 16, "Offset": 9 }, "ClearButtonStyle": { "Texture": { "TexturePath": "Common/ClearInputIcon.png", "Color": "#ffffff(0.3)" }, "HoveredTexture": { "TexturePath": "Common/ClearInputIcon.png", "Color": "#ffffff(0.5)" }, "PressedTexture": { "TexturePath": "Common/ClearInputIcon.png", "Color": "#ffffff(0.4)" }, "Width": 16, "Height": 16, "Side": "Right", "Offset": 10 } } }, "id": "SearchInput" })
        ]);
    },
}) as C<HeaderSearchProps, HeaderSearchSlots>;

type HeaderTextButtonCustomProps = {

};
type HeaderTextButtonProps = HeaderTextButtonCustomProps & Partial<NATIVE["TextButton"]>;
type HeaderTextButtonSlots = {

};

const HeaderTextButton = defineComponent({
    name: "HeaderTextButton",
    slots: Object as SlotsType<HeaderTextButtonSlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as HeaderTextButtonProps & Record<string, unknown>;
        return () => h("TextButton", { ...nativeProps, ...{ "elStyle": { "Default": { "LabelStyle": { "FontSize": 15, "VerticalAlignment": "Center", "RenderUppercase": true, "TextColor": "#d3d6db", "FontName": "Default", "RenderBold": true, "LetterSpacing": 1 } }, "Hovered": { "LabelStyle": { "FontSize": 15, "VerticalAlignment": "Center", "RenderUppercase": true, "TextColor": "#eaebee", "FontName": "Default", "RenderBold": true, "LetterSpacing": 1 } }, "Pressed": { "LabelStyle": { "FontSize": 15, "VerticalAlignment": "Center", "RenderUppercase": true, "TextColor": "#b6bbc2", "FontName": "Default", "RenderBold": true, "LetterSpacing": 1 } } }, "padding": { "Right": 22, "Left": 15, "Bottom": 1 } } });
    },
}) as C<HeaderTextButtonProps, HeaderTextButtonSlots>;

type HeaderSeparatorCustomProps = {

};
type HeaderSeparatorProps = HeaderSeparatorCustomProps & Partial<NATIVE["Group"]>;
type HeaderSeparatorSlots = {

};

const HeaderSeparator = defineComponent({
    name: "HeaderSeparator",
    slots: Object as SlotsType<HeaderSeparatorSlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as HeaderSeparatorProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "anchor": { "Width": 5, "Height": 34 }, "background": "Common/HeaderTabSeparator.png" } });
    },
}) as C<HeaderSeparatorProps, HeaderSeparatorSlots>;

type PanelTitleCustomProps = {
    alignment?: string;
    text?: string;
};
type PanelTitleProps = PanelTitleCustomProps & Partial<NATIVE["Group"]>;
type PanelTitleSlots = {

};

const PanelTitle = defineComponent({
    name: "PanelTitle",
    slots: Object as SlotsType<PanelTitleSlots>,
    props: {
        alignment: {
            type: String,
            default: "Start",
        },
        text: {
            type: String,
            default: "",
        }
    },
    setup(props, { slots }) {
        const { alignment, text, ...nativeProps } = props as PanelTitleProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "layoutMode": "Top" } }, [
            h("Label", { "elStyle": { "RenderBold": true, "VerticalAlignment": "Center", "FontSize": 15, "TextColor": "#afc2c3", "HorizontalAlignment": props.alignment }, "anchor": { "Height": 35, "Horizontal": 8 }, "text": props.text, "id": "PanelTitle" }),
            h("Group", { "background": "#393426(0.5)", "anchor": { "Height": 1 } })
        ]);
    },
}) as C<PanelTitleProps, PanelTitleSlots>;

type VerticalSeparatorCustomProps = {

};
type VerticalSeparatorProps = VerticalSeparatorCustomProps & Partial<NATIVE["Group"]>;
type VerticalSeparatorSlots = {

};

const VerticalSeparator = defineComponent({
    name: "VerticalSeparator",
    slots: Object as SlotsType<VerticalSeparatorSlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as VerticalSeparatorProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "background": { "TexturePath": "Common/ContainerVerticalSeparator.png" }, "anchor": { "Width": 6, "Top": -2 } } });
    },
}) as C<VerticalSeparatorProps, VerticalSeparatorSlots>;

type PanelSeparatorFancyCustomProps = {
    anchor?: {};
};
type PanelSeparatorFancyProps = PanelSeparatorFancyCustomProps & Partial<NATIVE["Group"]>;
type PanelSeparatorFancySlots = {

};

const PanelSeparatorFancy = defineComponent({
    name: "PanelSeparatorFancy",
    slots: Object as SlotsType<PanelSeparatorFancySlots>,
    props: {
        anchor: {
            type: Object as PropType<{}>,
            default: () => ({}),
        }
    },
    setup(props, { slots }) {
        const { anchor, ...nativeProps } = props as PanelSeparatorFancyProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "layoutMode": "Left", "anchor": props.anchor } }, [
            h("Group", { "flexWeight": 1, "background": "Common/ContainerPanelSeparatorFancyLine.png" }),
            h("Group", { "anchor": { "Width": 11 }, "background": "Common/ContainerPanelSeparatorFancyDecoration.png" }),
            h("Group", { "flexWeight": 1, "background": "Common/ContainerPanelSeparatorFancyLine.png" })
        ]);
    },
}) as C<PanelSeparatorFancyProps, PanelSeparatorFancySlots>;

type ContainerCustomProps = {
    contentPadding?: { Bottom?: number; Full?: number; Horizontal?: number; Left?: number; Right?: number; Top?: number; Vertical?: number };
    closeButton?: boolean;
};
type ContainerProps = ContainerCustomProps & Partial<NATIVE["Group"]>;
type ContainerSlots = {
    closeButton?: () => VNode[];
    content?: () => VNode[];
    title?: () => VNode[];
};

const Container = defineComponent({
    name: "Container",
    slots: Object as SlotsType<ContainerSlots>,
    props: {
        contentPadding: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Horizontal?: number; Left?: number; Right?: number; Top?: number; Vertical?: number }>,
            default: () => ({ "Full": 17 }),
        },
        closeButton: {
            type: Boolean,
            default: false,
        }
    },
    setup(props, { slots }) {
        const { contentPadding, closeButton, ...nativeProps } = props as ContainerProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{} }, [
            h("Group", { "anchor": { "Height": 38, "Top": 0 }, "padding": { "Top": 7 }, "background": { "TexturePath": "Common/ContainerHeaderNoRunes.png", "HorizontalBorder": 35, "VerticalBorder": 0 }, "id": "Title" }, slots.title ? slots.title() : []),
            h("Group", { "layoutMode": "Top", "padding": props.contentPadding, "anchor": { "Top": 38 }, "background": { "TexturePath": "Common/ContainerPatch.png", "Border": 23 }, "id": "Content" }, slots.content ? slots.content() : []),
            h("Button", { "anchor": { "Width": 32, "Height": 32, "Top": -8, "Right": -8 }, "elStyle": { "Default": { "Background": "Common/ContainerCloseButton.png" }, "Hovered": { "Background": "Common/ContainerCloseButtonHovered.png" }, "Pressed": { "Background": "Common/ContainerCloseButtonPressed.png" }, "Sounds": { "Activate": { "SoundPath": "Sounds/ButtonsCancelActivate.ogg", "MinPitch": -0.4, "MaxPitch": 0.4, "Volume": 6 }, "MouseHover": { "SoundPath": "Sounds/ButtonsLightHover.ogg", "Volume": 6 } } }, "visible": props.closeButton, "id": "CloseButton" }, slots.closeButton ? slots.closeButton() : [])
        ]);
    },
}) as C<ContainerProps, ContainerSlots>;

type DecoratedContainerCustomProps = {
    contentPadding?: { Bottom?: number; Full?: number; Horizontal?: number; Left?: number; Right?: number; Top?: number; Vertical?: number };
    closeButton?: boolean;
};
type DecoratedContainerProps = DecoratedContainerCustomProps & Partial<NATIVE["Group"]>;
type DecoratedContainerSlots = {
    closeButton?: () => VNode[];
    content?: () => VNode[];
    title?: () => VNode[];
};

const DecoratedContainer = defineComponent({
    name: "DecoratedContainer",
    slots: Object as SlotsType<DecoratedContainerSlots>,
    props: {
        contentPadding: {
            type: Object as PropType<{ Bottom?: number; Full?: number; Horizontal?: number; Left?: number; Right?: number; Top?: number; Vertical?: number }>,
            default: () => ({ "Full": 17 }),
        },
        closeButton: {
            type: Boolean,
            default: false,
        }
    },
    setup(props, { slots }) {
        const { contentPadding, closeButton, ...nativeProps } = props as DecoratedContainerProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{} }, [
            h("Group", { "anchor": { "Height": 38, "Top": 0 }, "background": { "TexturePath": "Common/ContainerHeader.png", "HorizontalBorder": 50, "VerticalBorder": 0 }, "padding": { "Top": 7 }, "id": "Title" }, slots.title ? slots.title() : [h("Group", { "anchor": { "Width": 236, "Height": 11, "Top": -12 }, "background": "Common/ContainerDecorationTop.png", "id": "ContainerDecorationTop" })]),
            h("Group", { "layoutMode": "Top", "anchor": { "Top": 38 }, "padding": props.contentPadding, "background": { "TexturePath": "Common/ContainerPatch.png", "Border": 23 }, "id": "Content" }, slots.content ? slots.content() : []),
            h("Group", { "anchor": { "Width": 236, "Height": 11, "Bottom": -6 }, "background": "Common/ContainerDecorationBottom.png", "id": "ContainerDecorationBottom" }),
            h("Button", { "anchor": { "Width": 32, "Height": 32, "Top": -8, "Right": -8 }, "elStyle": { "Default": { "Background": "Common/ContainerCloseButton.png" }, "Hovered": { "Background": "Common/ContainerCloseButtonHovered.png" }, "Pressed": { "Background": "Common/ContainerCloseButtonPressed.png" }, "Sounds": { "Activate": { "SoundPath": "Sounds/ButtonsCancelActivate.ogg", "MinPitch": -0.4, "MaxPitch": 0.4, "Volume": 6 }, "MouseHover": { "SoundPath": "Sounds/ButtonsLightHover.ogg", "Volume": 6 } } }, "visible": props.closeButton, "id": "CloseButton" }, slots.closeButton ? slots.closeButton() : [])
        ]);
    },
}) as C<DecoratedContainerProps, DecoratedContainerSlots>;

type PageOverlayCustomProps = {

};
type PageOverlayProps = PageOverlayCustomProps & Partial<NATIVE["Group"]>;
type PageOverlaySlots = {

};

const PageOverlay = defineComponent({
    name: "PageOverlay",
    slots: Object as SlotsType<PageOverlaySlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as PageOverlayProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "background": "#000000(0.45)" } });
    },
}) as C<PageOverlayProps, PageOverlaySlots>;

type BackButtonCustomProps = {

};
type BackButtonProps = BackButtonCustomProps & Partial<NATIVE["Group"]>;
type BackButtonSlots = {

};

const BackButton = defineComponent({
    name: "BackButton",
    slots: Object as SlotsType<BackButtonSlots>,
    props: {

    },
    setup(props, { slots }) {
        const nativeProps = props as BackButtonProps & Record<string, unknown>;
        return () => h("Group", { ...nativeProps, ...{ "layoutMode": "Left", "anchor": { "Left": 50, "Bottom": 50, "Width": 110, "Height": 27 } } }, [
            h("BackButton", {})
        ]);
    },
}) as C<BackButtonProps, BackButtonSlots>;

export const Common = {
    Panel,
    TitleLabel,
    TextButton,
    Button,
    CancelTextButton,
    CancelButton,
    SmallSecondaryTextButton,
    SmallTertiaryTextButton,
    SecondaryTextButton,
    SecondaryButton,
    TertiaryTextButton,
    TertiaryButton,
    CloseButton,
    CheckBox,
    CheckBoxWithLabel,
    TextField,
    NumberField,
    DropdownBox,
    ContentSeparator,
    DefaultSpinner,
    ActionButtonContainer,
    ActionButtonSeparator,
    VerticalActionButtonSeparator,
    Subtitle,
    Title,
    HeaderSearch,
    HeaderTextButton,
    HeaderSeparator,
    PanelTitle,
    VerticalSeparator,
    PanelSeparatorFancy,
    Container,
    DecoratedContainer,
    PageOverlay,
    BackButton
};
