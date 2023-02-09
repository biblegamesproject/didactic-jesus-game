//=============================================================================
// VisuStella MZ - Bright Effects
// VisuMZ_2_BrightEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BrightEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BrightEffects = VisuMZ.BrightEffects || {};
VisuMZ.BrightEffects.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.03] [BrightEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Bright_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This RPG Maker MZ plugin allows you to add various bright effects to your
 * game's maps and battle system. These effects can make the game appear more
 * vivid, light, and gives you control over the color settings of a particular
 * map to make a more distinct feeling, too. The bright effects can be changed
 * midway through events in both maps and battles, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * A Bloom filter effect that can help soften the feel of a map by giving
 *   objects on the screen a slight hazy glow.
 * * Godrays can be used to show animated sunlight coming down from the sky
 *   above.
 * * The Color Adjustment filter allows you to alter the brightness, contrast,
 *   and saturation levels of your maps and battles.
 * * Plugin Commands that allow you to adjust these settings on the go.
 * * Notetags for maps to alter the Bloom, Godray, and Color Adjustments
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * Pixi JS Filters*
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Effects
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Bloom
 * 
 * This filter puts a faint (or large) glow around lighter-colored objects on
 * the map to give them a softer, hazy, brighter feeling.
 * 
 * Properties:
 *
 * Scale: To adjust the strength of the bloom. Higher values is more
 * intense brightness.
 *
 * Brightness: The brightness, lower value is more subtle brightness, higher
 * value is blown-out.
 *
 * Threshold: Defines how bright a color needs to be to affect bloom.
 *
 * ---
 *
 * Godray
 * 
 * The Godray filter puts down rays of light coming from the sky at an angle.
 * This is often used to represent sunlight peaking from above the clouds.
 * 
 * Properties:
 *
 * Visible: If on, the godrays will be visible by default. If off, they won't.
 *
 * Speed: The speed at which the light flickers. Lower for slower rate.
 * Higher for faster speeds.
 *
 * Gain: General intensity of the effect.
 *
 * Lacunarity: The density of the fractal noise.
 *
 * Angle: The angle/light-source direction of the rays.
 *
 * ---
 *
 * Color Adjustment
 * 
 * The Color Adjustment filter allows you to control the colors on the screen
 * to be more/less bright, contrast more/less, and more/less saturated.
 * 
 * Properties:
 *
 * Brightness: Adjusts the overall brightness of the screen. Use lower numbers
 * to make it darker and higher numbers to increase the brightness.
 *
 * Contrast: Increases the separation between dark and bright. Darker colors
 * become darker. Lighter colors become lighter. Increase this number to make
 * the effect more intense or decrease it to lessen it.
 *
 * Saturate: Adjusts the intensity of color on the screen. User higher numbers
 * to make colors more intense and lower numbers to make it less.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * As of the VisuStella MZ Options Core v1.10 update, both the Bright Effects
 * and Horror Effects plugins will be affected by the "Special Effects" option
 * found under the Options Core's General Settings. If the "Special Effects"
 * option is set to OFF, then the filter effects applied by those plugins will
 * also be disabled. They will be reenabled when the option is set back to ON.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Bloom-Related Notetags ===
 * 
 * ---
 *
 * <Bloom Scale: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom scale to x for map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less bloom
 *   - Higher - More bloom
 *
 * ---
 *
 * <Bloom Brightness: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom brightness to x for map/battle
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Bloom Threshold: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom threshold to x for map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less picky
 *   - Higher - More picky
 *
 * ---
 *
 * <Bloom Horz Scale: x to y>
 * <Bloom Vert Scale: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting scale when traveling left to right on the map
 *   (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less bloom
 *   - Higher - More bloom
 *
 * ---
 *
 * <Bloom Horz Brightness: x to y>
 * <Bloom Vert Brightness: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting brightness when traveling left to right on the
 *   map (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Bloom Horz Threshold: x to y>
 * <Bloom Vert Threshold: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting threshold when traveling left to right on the
 *   map (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less picky
 *   - Higher - More picky
 *
 * ---
 * 
 * === Godray-Related Notetags ===
 * 
 * ---
 *
 * <Godray>
 * <No Godray>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes if there will be a godray on the map/battle regardless of the
 *   default settings in the plugin parameters.
 *
 * ---
 *
 * <Godray Speed: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the flickering speed of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Slower
 *   - Higher - Faster
 *
 * ---
 *
 * <Godray Gain: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the gain/intensity of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Lighter
 *   - Higher - Intense
 *
 * ---
 *
 * <Godray Lacunarity: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the lacunarity/density of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less dense
 *   - Higher - More dense
 *
 * ---
 *
 * <Godray Angle: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the angle of the rays.
 * - Replace 'x' with a number to represent the value. Use a negative or
 *   positive integer value.
 *   - Negative - Coming from the left
 *   - Positive - Coming from the right
 *
 * ---
 *
 * <Godray Horz Speed: x to y>
 * <Godray Vert Speed: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray speed going left to right on a map (Horz) or up
 *   to down on a map (Vert). 
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Slower
 *   - Higher - Faster
 *
 * ---
 *
 * <Godray Horz Gain: x to y>
 * <Godray Vert Gain: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray gain going left to right on a map (Horz) or up to
 *   down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Lighter
 *   - Higher - Intense
 *
 * ---
 *
 * <Godray Horz Lacunarity: x to y>
 * <Godray Vert Lacunarity: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray lacunarity going left to right on a map (Horz) or
 *   up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less dense
 *   - Higher - More dense
 *
 * ---
 *
 * <Godray Horz Angle: x to y>
 * <Godray Vert Angle: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray angle going left to right on a map (Horz) or up
 *   to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use a negative or
 *   positive integer values.
 *   - Negative - Coming from the left
 *   - Positive - Coming from the right
 *
 * ---
 * 
 * === Color Adjust-Related Notetags ===
 * 
 * ---
 *
 * <Color Adjust Brightness: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Alters the screen brightness for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Contrast: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the screen contrast for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less contrast
 *   - Higher - More contrast
 *
 * ---
 *
 * <Color Adjust Saturate: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the screen saturation for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Horz Brightness: x to y>
 * <Color Adjust Vert Brightness: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Alters the screen brightness when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Horz Contrast: x to y>
 * <Color Adjust Vert Contrast: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts the screen contrast when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less contrast
 *   - Higher - More contrast
 *
 * ---
 *
 * <Color Adjust Horz Saturate: x to y>
 * <Color Adjust Vert Saturate: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts the screen saturation when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less intensity
 *   - Higher - More intensity
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Bloom Plugin Commands ===
 * 
 * ---
 *
 * Bloom: Change Settings
 * - Change the Bloom filter settings for the screen.
 *
 *   Bloom Scale:
 *   - Change bloom scale for the screen.
 *
 *   Bloom Brightness:
 *   - Change bloom brightness for the screen.
 *
 *   Bloom Threshold:
 *   - Change bloom threshold for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *
 * ---
 *
 * Bloom: Reset
 * - Reset the Bloom filter settings for the settings found in the Plugin
 *   Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *
 * ---
 * 
 * === Godray Plugin Commands ===
 * 
 * ---
 *
 * Godray: Change Settings
 * - Change the Godray filter settings for the screen.
 *
 *   Visible?:
 *   - Show godrays on the screen?
 *   - Visibility changes are immediate.
 *
 *   Godray Speed:
 *   - Change godray speed for the screen.
 *
 *   Godray Gain:
 *   - Change godray gain for the screen.
 *
 *   Godray Lacunarity:
 *   - Change godray lacunarity for the screen.
 *
 *   Godray Angle:
 *   - Change godray angle for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *   - Visibility changes are immediate.
 *
 * ---
 *
 * Godray: Reset
 * - Reset the Godray filter settings for the settings found in the Plugin
 *   Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *   - Visibility changes are immediate.
 *
 * ---
 * 
 * === Color Adjust Plugin Commands ===
 * 
 * ---
 *
 * Color Adjust: Change Settings
 * - Change the Color Adjustment filter settings for the screen.
 *
 *   Adjust Brightness:
 *   - Change color adjust brightness for the screen.
 *
 *   Adjust Contrast:
 *   - Change color adjust contrast for the screen.
 *
 *   Adjust Saturation:
 *   - Change color adjust saturation for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *
 * ---
 *
 * Color Adjust: Reset
 * - Reset the Color Adjustment filter settings for the settings found in the
 *   Plugin Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Bloom Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Bloom Settings
 * 
 *   Bloom Scale:
 *   - Default bloom scale for the screen unless changed through tags.
 * 
 *   Bloom Brightness:
 *   - Default bloom brightness for the screen unless changed through tags.
 * 
 *   Bloom Threshold:
 *   - Default bloom threshold for the screen unless changed through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Godray Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Godray Settings
 * 
 *   Default Visible?:
 *   - Show godrays on all screens by default unless changed through tags?
 * 
 *   Godray Speed:
 *   - Default godray speed for all screens unless changed through tags.
 * 
 *   Godray Gain:
 *   - Default godray gain for all screens unless changed through tags.
 * 
 *   Godray Lacunarity:
 *   - Default godray lacunarity for all screens unless changed through tags.
 * 
 *   Godray Angle:
 *   - Default godray angle for all screens unless changed through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Adjust Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Color Adjust Settings
 * 
 *   Adjust Brightness:
 *   - Default color adjust brightness for all screens unless changed
 *     through tags.
 * 
 *   Adjust Contrast:
 *   - Default color adjust contrast for all screens unless changed
 *     through tags.
 * 
 *   Adjust Saturation:
 *   - Default color adjust saturation for all screens unless changed
 *     through tags.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: April 2, 2021
 * * Bug Fixes!
 * ** Changing scenes while a filter change is in transition will automatically
 *    load up the changes made to the filter to prevent desynchronization.
 *    Fix made by Olivia.
 * 
 * Version 1.02: March 12, 2021
 * * Compatibility Update!
 * ** Added compatibility with the VisuStella MZ Options Core v1.10 update.
 * *** When the "Special Effects" option is set to OFF, the filters for this
 *     plugin will be shut off. They will be returned to normal when set to ON.
 * * Documentation Update!
 * ** Added the Options Core section to the "Extra Features" list.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Bright effects from battle should no longer carry back over into the
 *    map scene. Fix made by Yanfly.
 *
 * Version 1.00: January 18, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BloomChange
 * @text Bloom: Change Settings
 * @desc Change the Bloom filter settings for the screen.
 *
 * @arg Scale:num
 * @text Bloom Scale
 * @desc Change bloom scale for the screen.
 * @default 0.5
 *
 * @arg Brightness:num
 * @text Bloom Brightness
 * @desc Change bloom brightness for the screen.
 * @default 1.0
 *
 * @arg Threshold:num
 * @text Bloom Threshold
 * @desc Change bloom threshold for the screen.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BloomReset
 * @text Bloom: Reset
 * @desc Reset the Bloom filter settings for the settings found in
 * the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GodrayChange
 * @text Godray: Change Settings
 * @desc Change the Godray filter settings for the screen.
 *
 * @arg Visible:eval
 * @text Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show godrays on the screen?
 * Visibility changes are immediate.
 * @default true
 *
 * @arg Speed:num
 * @text Godray Speed
 * @desc Change godray speed for the screen.
 * @default 0.01
 *
 * @arg Gain:num
 * @text Godray Gain
 * @desc Change godray gain for the screen.
 * @default 0.6
 *
 * @arg Lacunarity:num
 * @text Godray Lacunarity
 * @desc Change godray lacunarity for the screen.
 * @default 2.0
 *
 * @arg Angle:num
 * @text Godray Angle
 * @desc Change godray angle for the screen.
 * @default -30
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * Visibility changes are immediate.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GodrayReset
 * @text Godray: Reset
 * @desc Reset the Godray filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * Visibility changes are immediate.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ColorAdjustChange
 * @text Color Adjust: Change Settings
 * @desc Change the Color Adjustment filter settings for the screen.
 *
 * @arg Brightness:num
 * @text Adjust Brightness
 * @desc Change color adjust brightness for the screen.
 * @default 1.0
 *
 * @arg Contrast:num
 * @text Adjust Contrast
 * @desc Change color adjust contrast for the screen.
 * @default 0.0
 *
 * @arg Saturate:num
 * @text Adjust Saturation
 * @desc Change color adjust saturation for the screen.
 * @default 0.0
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ColorAdjustReset
 * @text Color Adjust: Reset
 * @desc Reset the Color Adjustment filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BrightEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Map
 * @text Map Defaults
 *
 * @param MapBloom:struct
 * @text Bloom Settings
 * @parent Map
 * @type struct<Bloom>
 * @desc Default bloom settings for all maps.
 * @default {"Scale:num":"0.5","Brightness:num":"1.0","Threshold:num":"0.5"}
 *
 * @param MapGodray:struct
 * @text Godray Settings
 * @parent Map
 * @type struct<Godray>
 * @desc Default Godray settings for all maps.
 * @default {"Visible:eval":"false","Speed:num":"0.01","Gain:num":"0.6","Lacunarity:num":"2.0","Angle:num":"-30"}
 *
 * @param MapColorAdjust:struct
 * @text Color Adjust Settings
 * @parent Map
 * @type struct<ColorAdjust>
 * @desc Default color adjustment settings for all maps.
 * @default {"Brightness:num":"1.0","Contrast:num":"0.0","Saturate:num":"0.0"}
 * 
 * @param Battle
 * @text Battle Defaults
 *
 * @param BattleBloom:struct
 * @text Bloom Settings
 * @parent Battle
 * @type struct<Bloom>
 * @desc Default bloom settings for all battles.
 * @default {"Scale:num":"0.5","Brightness:num":"1.0","Threshold:num":"0.5"}
 *
 * @param BattleGodray:struct
 * @text Godray Settings
 * @parent Battle
 * @type struct<Godray>
 * @desc Default Godray settings for all battles.
 * @default {"Visible:eval":"false","Speed:num":"0.01","Gain:num":"0.6","Lacunarity:num":"2.0","Angle:num":"-30"}
 *
 * @param BattleColorAdjust:struct
 * @text Color Adjust Settings
 * @parent Battle
 * @type struct<ColorAdjust>
 * @desc Default color adjustment settings for all battles.
 * @default {"Brightness:num":"1.0","Contrast:num":"0.0","Saturate:num":"0.0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Bloom Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Bloom:
 *
 * @param Scale:num
 * @text Bloom Scale
 * @desc Default bloom scale for the screen unless changed through tags.
 * @default 0.5
 *
 * @param Brightness:num
 * @text Bloom Brightness
 * @desc Default bloom brightness for the screen unless changed through tags.
 * @default 1.0
 *
 * @param Threshold:num
 * @text Bloom Threshold
 * @desc Default bloom threshold for the screen unless changed through tags.
 * @default 0.5
 *
 */
/* ----------------------------------------------------------------------------
 * Godray Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Godray:
 *
 * @param Visible:eval
 * @text Default Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show godrays on all screens by default unless changed through tags?
 * @default false
 *
 * @param Speed:num
 * @text Godray Speed
 * @desc Default godray speed for all screens unless changed through tags.
 * @default 0.01
 *
 * @param Gain:num
 * @text Godray Gain
 * @desc Default godray gain for all screens unless changed through tags.
 * @default 0.6
 *
 * @param Lacunarity:num
 * @text Godray Lacunarity
 * @desc Default godray lacunarity for all screens unless changed through tags.
 * @default 2.0
 *
 * @param Angle:num
 * @text Godray Angle
 * @desc Default godray angle for all screens unless changed through tags.
 * @default -30
 *
 */
/* ----------------------------------------------------------------------------
 * Color Adjust Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ColorAdjust:
 *
 * @param Brightness:num
 * @text Adjust Brightness
 * @desc Default color adjust brightness for all screens unless changed through tags.
 * @default 1.0
 *
 * @param Contrast:num
 * @text Adjust Contrast
 * @desc Default color adjust contrast for all screens unless changed through tags.
 * @default 0.0
 *
 * @param Saturate:num
 * @text Adjust Saturation
 * @desc Default color adjust saturation for all screens unless changed through tags.
 * @default 0.0
 *
 */
//=============================================================================

var _0x2707=['setBrightEffectsColorAdjustSettings','_brightEffectsBloomHorzScale','createBrightEffectsFilters','version','Duration','40754hoQgrW','update','BattleGodray','1PJiCgB','_brightEffectsGodrayHorzLacunarity','_BrightEffectsColorAdjustFilter','exit','isSceneBattle','updateBrightEffectsFilters','_brightEffectsGodrayHorzAngle','GodrayReset','1bkQYdK','contrast','_BrightEffectsColorAdjustSettingsBattle','749307luYuzY','status','Gain','troop','Contrast','currentBrightness','_brightEffectsGodrayVertSpeed','_BrightEffectsGodraySettingsBattle','createOverallFilters','ConvertParams','lacunarity','_BrightEffectsColorAdjustSettingsMap','map','_brightEffectsGodrayHorzSpeed','gain','Scene_Battle_start','_brightEffectsBloomHorzBrightness','FUNC','371687ezpCDy','brightness','Visible','_brightEffectsBloomHorzThreshold','includes','Settings','isSceneMap','_brightEffectsColorAdjustVertBrightness','_realY','setupBrightEffectsFilters','filters','ColorMatrixFilter','prototype','name','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','saturate','_BrightEffectsGodraySettingsMap','_brightEffectsGodrayVertAngle','BrightEffects','Saturate','5eMIYxq','412705CmnKfX','ARRAYJSON','_brightEffectsColorAdjustVertSaturate','601987sWpSuy','ARRAYEVAL','AdvancedBloomFilter','setup','angle','updateMapBrightEffects','parse','setupBrightEffectsColorAdjustFilter','updateBrightEffectsAdvBloomFilter','ARRAYSTRUCT','_brightEffectsColorAdjustHorzContrast','Speed','BloomChange','_brightEffectsColorAdjustHorzBrightness','updateBrightEffectsGodrayFilter','_realX','Spriteset_Base_update','createBrightEffectsAdvBloomFilter','STRUCT','updateMapBrightEffectsColorAdjust','currentContrast','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_brightEffectsGodrayHorzGain','145077xXodno','note','call','Scale','visible','setBrightEffectsGodraySettings','MapGodray','_brightEffectsBloomVertThreshold','speed','time','1wqDafY','createBrightEffectsGodrayFilter','_BrightEffectsAdvBloomSettingsBattle','_BrightEffectsGodrayFilter','bloomScale','_brightEffectsColorAdjustVertContrast','ColorAdjustReset','registerCommand','STR','JSON','Brightness','_brightEffectsBloomVertScale','start','_brightEffectsGodrayVertLacunarity','getBrightEffectsGodraySettings','enabled','Angle','duration','_brightEffectsGodrayVertGain','_BrightEffectsAdvBloomSettingsMap','constructor','401737lkbTvs','locate','push','getBrightEffectsColorAdjustSettings','specialEffects','_BrightEffectsAdvBloomFilter','Lacunarity','setupBrightEffectsAdvBloomFilter','Game_Map_setup','updateBrightEffectsColorAdjustFilter','GodrayFilter','width','max','match','format','threshold','height','_brightEffectsBloomVertBrightness','updateMapBrightEffectsAdvBloom','currentSaturate','_scene','getBrightEffectsAdvBloomSettings','updateMapBrightEffectsGodray','ARRAYNUM','setBrightEffectsAdvBloomSettings','parameters','Game_CharacterBase_locate','_brightEffectsColorAdjustHorzSaturate','setupBrightEffectsGodrayFilter','Threshold','createBrightEffectsColorAdjustFilter','ColorAdjustChange','Spriteset_Base_createOverallFilters','return\x200','NUM','EVAL'];var _0x1087=function(_0x3e0bee,_0x5b85ba){_0x3e0bee=_0x3e0bee-0x166;var _0x2707e5=_0x2707[_0x3e0bee];return _0x2707e5;};var _0xe7c4f3=_0x1087;(function(_0x3f5175,_0x5445f6){var _0x147ede=_0x1087;while(!![]){try{var _0x48d042=-parseInt(_0x147ede(0x175))*parseInt(_0x147ede(0x1a9))+parseInt(_0x147ede(0x1ad))*-parseInt(_0x147ede(0x1ce))+-parseInt(_0x147ede(0x1aa))+parseInt(_0x147ede(0x178))*parseInt(_0x147ede(0x1c4))+-parseInt(_0x147ede(0x180))*-parseInt(_0x147ede(0x183))+parseInt(_0x147ede(0x195))+parseInt(_0x147ede(0x1e3));if(_0x48d042===_0x5445f6)break;else _0x3f5175['push'](_0x3f5175['shift']());}catch(_0x3dcc96){_0x3f5175['push'](_0x3f5175['shift']());}}}(_0x2707,0x6db42));var label=_0xe7c4f3(0x1a7),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x1c4849){var _0x4ac732=_0xe7c4f3;return _0x1c4849[_0x4ac732(0x184)]&&_0x1c4849['description'][_0x4ac732(0x199)]('['+label+']');})[0x0];VisuMZ[label][_0xe7c4f3(0x19a)]=VisuMZ[label]['Settings']||{},VisuMZ[_0xe7c4f3(0x18c)]=function(_0x209b98,_0x5ee59d){var _0x1d2452=_0xe7c4f3;for(const _0x4c6bd7 in _0x5ee59d){if(_0x4c6bd7[_0x1d2452(0x1f0)](/(.*):(.*)/i)){const _0x21a232=String(RegExp['$1']),_0x1da98f=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x1dc0fe,_0x392125,_0x3d45b1;switch(_0x1da98f){case _0x1d2452(0x16e):_0x1dc0fe=_0x5ee59d[_0x4c6bd7]!==''?Number(_0x5ee59d[_0x4c6bd7]):0x0;break;case _0x1d2452(0x1fa):_0x392125=_0x5ee59d[_0x4c6bd7]!==''?JSON['parse'](_0x5ee59d[_0x4c6bd7]):[],_0x1dc0fe=_0x392125['map'](_0x36a6bd=>Number(_0x36a6bd));break;case _0x1d2452(0x16f):_0x1dc0fe=_0x5ee59d[_0x4c6bd7]!==''?eval(_0x5ee59d[_0x4c6bd7]):null;break;case _0x1d2452(0x1ae):_0x392125=_0x5ee59d[_0x4c6bd7]!==''?JSON['parse'](_0x5ee59d[_0x4c6bd7]):[],_0x1dc0fe=_0x392125[_0x1d2452(0x18f)](_0x1bc380=>eval(_0x1bc380));break;case _0x1d2452(0x1d7):_0x1dc0fe=_0x5ee59d[_0x4c6bd7]!==''?JSON[_0x1d2452(0x1b3)](_0x5ee59d[_0x4c6bd7]):'';break;case _0x1d2452(0x1ab):_0x392125=_0x5ee59d[_0x4c6bd7]!==''?JSON[_0x1d2452(0x1b3)](_0x5ee59d[_0x4c6bd7]):[],_0x1dc0fe=_0x392125[_0x1d2452(0x18f)](_0x2b0dbe=>JSON[_0x1d2452(0x1b3)](_0x2b0dbe));break;case _0x1d2452(0x194):_0x1dc0fe=_0x5ee59d[_0x4c6bd7]!==''?new Function(JSON[_0x1d2452(0x1b3)](_0x5ee59d[_0x4c6bd7])):new Function(_0x1d2452(0x16d));break;case'ARRAYFUNC':_0x392125=_0x5ee59d[_0x4c6bd7]!==''?JSON[_0x1d2452(0x1b3)](_0x5ee59d[_0x4c6bd7]):[],_0x1dc0fe=_0x392125['map'](_0x5c5cc0=>new Function(JSON[_0x1d2452(0x1b3)](_0x5c5cc0)));break;case _0x1d2452(0x1d6):_0x1dc0fe=_0x5ee59d[_0x4c6bd7]!==''?String(_0x5ee59d[_0x4c6bd7]):'';break;case'ARRAYSTR':_0x392125=_0x5ee59d[_0x4c6bd7]!==''?JSON[_0x1d2452(0x1b3)](_0x5ee59d[_0x4c6bd7]):[],_0x1dc0fe=_0x392125[_0x1d2452(0x18f)](_0x48d59d=>String(_0x48d59d));break;case _0x1d2452(0x1bf):_0x3d45b1=_0x5ee59d[_0x4c6bd7]!==''?JSON[_0x1d2452(0x1b3)](_0x5ee59d[_0x4c6bd7]):{},_0x1dc0fe=VisuMZ[_0x1d2452(0x18c)]({},_0x3d45b1);break;case _0x1d2452(0x1b6):_0x392125=_0x5ee59d[_0x4c6bd7]!==''?JSON[_0x1d2452(0x1b3)](_0x5ee59d[_0x4c6bd7]):[],_0x1dc0fe=_0x392125[_0x1d2452(0x18f)](_0x55b351=>VisuMZ[_0x1d2452(0x18c)]({},JSON[_0x1d2452(0x1b3)](_0x55b351)));break;default:continue;}_0x209b98[_0x21a232]=_0x1dc0fe;}}return _0x209b98;},(_0x3847c2=>{var _0x2d5dd3=_0xe7c4f3;const _0x455405=_0x3847c2[_0x2d5dd3(0x1a2)];for(const _0x1a0da7 of dependencies){if(!Imported[_0x1a0da7]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2d5dd3(0x1f1)](_0x455405,_0x1a0da7)),SceneManager[_0x2d5dd3(0x17b)]();break;}}const _0x59e378=_0x3847c2['description'];if(_0x59e378[_0x2d5dd3(0x1f0)](/\[Version[ ](.*?)\]/i)){const _0x373a71=Number(RegExp['$1']);_0x373a71!==VisuMZ[label][_0x2d5dd3(0x173)]&&(alert(_0x2d5dd3(0x1a3)[_0x2d5dd3(0x1f1)](_0x455405,_0x373a71)),SceneManager['exit']());}if(_0x59e378['match'](/\[Tier[ ](\d+)\]/i)){const _0x399246=Number(RegExp['$1']);_0x399246<tier?(alert(_0x2d5dd3(0x1c2)[_0x2d5dd3(0x1f1)](_0x455405,_0x399246,tier)),SceneManager[_0x2d5dd3(0x17b)]()):tier=Math[_0x2d5dd3(0x1ef)](_0x399246,tier);}VisuMZ[_0x2d5dd3(0x18c)](VisuMZ[label][_0x2d5dd3(0x19a)],_0x3847c2[_0x2d5dd3(0x1fc)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0xe7c4f3(0x1a2)],_0xe7c4f3(0x1b9),_0x13a490=>{var _0x49259d=_0xe7c4f3;VisuMZ[_0x49259d(0x18c)](_0x13a490,_0x13a490);const _0x4810b5=$gameScreen[_0x49259d(0x1f8)]();_0x4810b5['bloomScale']=_0x13a490['Scale'],_0x4810b5['brightness']=_0x13a490[_0x49259d(0x1d8)],_0x4810b5[_0x49259d(0x1f2)]=_0x13a490[_0x49259d(0x169)],_0x4810b5[_0x49259d(0x1df)]=_0x13a490[_0x49259d(0x174)],!SceneManager[_0x49259d(0x17c)]()&&($gameMap['_brightEffectsBloomHorzBrightness']=undefined,$gameMap[_0x49259d(0x1f4)]=undefined);}),PluginManager[_0xe7c4f3(0x1d5)](pluginData[_0xe7c4f3(0x1a2)],'BloomReset',_0xfe5559=>{var _0x2fb278=_0xe7c4f3;VisuMZ['ConvertParams'](_0xfe5559,_0xfe5559);SceneManager[_0x2fb278(0x17c)]()?$gameTroop[_0x2fb278(0x1ea)]():$gameMap[_0x2fb278(0x1ea)]();const _0x1e66bd=$gameScreen[_0x2fb278(0x1f8)]();_0x1e66bd['duration']=_0xfe5559['Duration'];}),PluginManager['registerCommand'](pluginData['name'],'GodrayChange',_0x3d6f6b=>{var _0x3eb932=_0xe7c4f3;VisuMZ['ConvertParams'](_0x3d6f6b,_0x3d6f6b);const _0x31a2bb=$gameScreen['getBrightEffectsGodraySettings']();_0x31a2bb[_0x3eb932(0x1c8)]=_0x3d6f6b[_0x3eb932(0x197)],_0x31a2bb[_0x3eb932(0x1cc)]=_0x3d6f6b[_0x3eb932(0x1b8)],_0x31a2bb['gain']=_0x3d6f6b[_0x3eb932(0x185)],_0x31a2bb[_0x3eb932(0x18d)]=_0x3d6f6b[_0x3eb932(0x1e9)],_0x31a2bb[_0x3eb932(0x1b1)]=_0x3d6f6b[_0x3eb932(0x1de)],_0x31a2bb[_0x3eb932(0x1df)]=_0x3d6f6b[_0x3eb932(0x174)],!SceneManager['isSceneBattle']()&&($gameMap[_0x3eb932(0x190)]=undefined,$gameMap[_0x3eb932(0x189)]=undefined);}),PluginManager[_0xe7c4f3(0x1d5)](pluginData[_0xe7c4f3(0x1a2)],_0xe7c4f3(0x17f),_0xb1a7d7=>{var _0x46ed9d=_0xe7c4f3;VisuMZ['ConvertParams'](_0xb1a7d7,_0xb1a7d7);SceneManager['isSceneBattle']()?$gameTroop[_0x46ed9d(0x168)]():$gameMap[_0x46ed9d(0x168)]();const _0x250b8e=$gameScreen[_0x46ed9d(0x1dc)]();_0x250b8e[_0x46ed9d(0x1df)]=_0xb1a7d7[_0x46ed9d(0x174)];}),PluginManager[_0xe7c4f3(0x1d5)](pluginData[_0xe7c4f3(0x1a2)],_0xe7c4f3(0x16b),_0x58fc8c=>{var _0x463c93=_0xe7c4f3;VisuMZ[_0x463c93(0x18c)](_0x58fc8c,_0x58fc8c);const _0x1da1ff=$gameScreen[_0x463c93(0x1e6)]();_0x1da1ff[_0x463c93(0x196)]=_0x58fc8c[_0x463c93(0x1d8)],_0x1da1ff['contrast']=_0x58fc8c['Contrast'],_0x1da1ff['saturate']=_0x58fc8c[_0x463c93(0x1a8)],_0x1da1ff[_0x463c93(0x1df)]=_0x58fc8c[_0x463c93(0x174)],!SceneManager['isSceneBattle']()&&($gameMap['_brightEffectsColorAdjustHorzSaturate']=undefined,$gameMap['_brightEffectsColorAdjustVertSaturate']=undefined);}),PluginManager[_0xe7c4f3(0x1d5)](pluginData['name'],_0xe7c4f3(0x1d4),_0x2c34ca=>{var _0x43643e=_0xe7c4f3;VisuMZ[_0x43643e(0x18c)](_0x2c34ca,_0x2c34ca);SceneManager[_0x43643e(0x17c)]()?$gameTroop[_0x43643e(0x1b4)]():$gameMap[_0x43643e(0x1b4)]();const _0x2e857d=$gameScreen[_0x43643e(0x1e6)]();_0x2e857d[_0x43643e(0x1df)]=_0x2c34ca[_0x43643e(0x174)];}),SceneManager[_0xe7c4f3(0x17c)]=function(){var _0xed5a6d=_0xe7c4f3;return this[_0xed5a6d(0x1f7)]&&this[_0xed5a6d(0x1f7)][_0xed5a6d(0x1e2)]===Scene_Battle;},SceneManager[_0xe7c4f3(0x19b)]=function(){var _0x12dacd=_0xe7c4f3;return this['_scene']&&this[_0x12dacd(0x1f7)][_0x12dacd(0x1e2)]===Scene_Map;},Game_Screen[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1fb)]=function(_0x34248c,_0x264c37,_0x1436c0,_0x137bc6){var _0x261540=_0xe7c4f3;SceneManager[_0x261540(0x17c)]()?this['_BrightEffectsAdvBloomSettingsBattle']={'bloomScale':_0x34248c,'brightness':_0x264c37,'threshold':_0x1436c0,'duration':_0x137bc6||0x0}:this[_0x261540(0x1e1)]={'bloomScale':_0x34248c,'brightness':_0x264c37,'threshold':_0x1436c0,'duration':_0x137bc6||0x0};},Game_Screen[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1c9)]=function(_0x45326b,_0xe72cfa,_0x597c22,_0x43e538,_0x37cad1,_0x39bfb9){var _0x1b5096=_0xe7c4f3;SceneManager[_0x1b5096(0x17c)]()?this[_0x1b5096(0x18a)]={'visible':_0x45326b,'speed':_0xe72cfa,'gain':_0x597c22,'lacunarity':_0x43e538,'angle':_0x37cad1,'duration':_0x39bfb9||0x0}:this[_0x1b5096(0x1a5)]={'visible':_0x45326b,'speed':_0xe72cfa,'gain':_0x597c22,'lacunarity':_0x43e538,'angle':_0x37cad1,'duration':_0x39bfb9||0x0};},Game_Screen[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x170)]=function(_0x4a4967,_0x1eff99,_0x4e75ba,_0x377b33){var _0x3a469a=_0xe7c4f3;SceneManager[_0x3a469a(0x17c)]()?this[_0x3a469a(0x182)]={'brightness':_0x4a4967,'contrast':_0x1eff99,'saturate':_0x4e75ba,'duration':_0x377b33||0x0}:this[_0x3a469a(0x18e)]={'brightness':_0x4a4967,'contrast':_0x1eff99,'saturate':_0x4e75ba,'duration':_0x377b33||0x0};},Game_Screen['prototype'][_0xe7c4f3(0x1f8)]=function(){var _0x2fedb9=_0xe7c4f3;return SceneManager['isSceneBattle']()?(this['_BrightEffectsAdvBloomSettingsBattle']===undefined&&$gameTroop[_0x2fedb9(0x1ea)](),this[_0x2fedb9(0x1d0)]):(this['_BrightEffectsAdvBloomSettingsMap']===undefined&&$gameMap[_0x2fedb9(0x1ea)](),this['_BrightEffectsAdvBloomSettingsMap']);},Game_Screen[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1dc)]=function(){var _0x249ee6=_0xe7c4f3;return SceneManager[_0x249ee6(0x17c)]()?(this['_BrightEffectsGodraySettingsBattle']===undefined&&$gameTroop['setupBrightEffectsGodrayFilter'](),this[_0x249ee6(0x18a)]):(this[_0x249ee6(0x1a5)]===undefined&&$gameMap['setupBrightEffectsGodrayFilter'](),this['_BrightEffectsGodraySettingsMap']);},Game_Screen['prototype'][_0xe7c4f3(0x1e6)]=function(){var _0x3313d8=_0xe7c4f3;return SceneManager[_0x3313d8(0x17c)]()?(this[_0x3313d8(0x182)]===undefined&&$gameTroop[_0x3313d8(0x1b4)](),this['_BrightEffectsColorAdjustSettingsBattle']):(this['_BrightEffectsColorAdjustSettingsMap']===undefined&&$gameMap[_0x3313d8(0x1b4)](),this[_0x3313d8(0x18e)]);},VisuMZ[_0xe7c4f3(0x1a7)][_0xe7c4f3(0x192)]=Scene_Battle[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1da)],Scene_Battle[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1da)]=function(){var _0x5adf64=_0xe7c4f3;VisuMZ[_0x5adf64(0x1a7)][_0x5adf64(0x192)][_0x5adf64(0x1c6)](this),$gameTroop[_0x5adf64(0x19e)]();},Game_Troop['prototype']['setupBrightEffectsFilters']=function(){var _0x43bbd4=_0xe7c4f3;this[_0x43bbd4(0x1ea)](),this[_0x43bbd4(0x168)](),this[_0x43bbd4(0x1b4)]();},Game_Troop[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1ea)]=function(){var _0x405d22=_0xe7c4f3;const _0x23634d=VisuMZ[_0x405d22(0x1a7)]['Settings']['BattleBloom'];var _0x5aba61=_0x23634d[_0x405d22(0x1c7)],_0xf087bf=_0x23634d[_0x405d22(0x1d8)],_0x4d8c97=_0x23634d[_0x405d22(0x169)];if(!!this[_0x405d22(0x186)]()){var _0x9c713c=this[_0x405d22(0x186)]()[_0x405d22(0x1a2)];if(_0x9c713c[_0x405d22(0x1f0)](/<BLOOM SCALE: (.*)>/i))var _0x5aba61=Number(RegExp['$1'])||0x0;if(_0x9c713c[_0x405d22(0x1f0)](/<BLOOM BRIGHTNESS: (.*)>/i))var _0xf087bf=Number(RegExp['$1'])||0x0;if(_0x9c713c[_0x405d22(0x1f0)](/<BLOOM THRESHOLD: (.*)>/i))var _0x4d8c97=Number(RegExp['$1'])||0x0;}$gameScreen[_0x405d22(0x1fb)](_0x5aba61,_0xf087bf,_0x4d8c97,0x0);},Game_Troop[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x168)]=function(){var _0x3b5261=_0xe7c4f3;const _0x248d22=VisuMZ[_0x3b5261(0x1a7)][_0x3b5261(0x19a)][_0x3b5261(0x177)];var _0x282a46=_0x248d22[_0x3b5261(0x197)],_0x5d5629=_0x248d22[_0x3b5261(0x1b8)],_0x3b26d9=_0x248d22[_0x3b5261(0x185)],_0xf23ab1=_0x248d22['Lacunarity'],_0x5e8f36=_0x248d22[_0x3b5261(0x1de)];if(!!this[_0x3b5261(0x186)]()){var _0x5f377b=this[_0x3b5261(0x186)]()[_0x3b5261(0x1a2)];if(_0x5f377b['match'](/<GODRAY>/i))_0x282a46=!![];else _0x5f377b[_0x3b5261(0x1f0)](/<NO GODRAY>/i)&&(_0x282a46=![]);_0x5f377b[_0x3b5261(0x1f0)](/<GODRAY SPEED: (.*)>/i)&&(_0x5d5629=Number(RegExp['$1'])||0x0),_0x5f377b['match'](/<GODRAY GAIN: (.*)>/i)&&(_0x3b26d9=Number(RegExp['$1'])||0x0),_0x5f377b['match'](/<GODRAY LACUNARITY: (.*)>/i)&&(_0xf23ab1=Number(RegExp['$1'])||0x0),_0x5f377b['match'](/<GODRAY ANGLE: (.*)>/i)&&(_0x5e8f36=Number(RegExp['$1'])||0x0);}$gameScreen[_0x3b5261(0x1c9)](_0x282a46,_0x5d5629,_0x3b26d9,_0xf23ab1,_0x5e8f36,0x0);},Game_Troop[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1b4)]=function(){var _0xd2a5ab=_0xe7c4f3;const _0x377abd=VisuMZ[_0xd2a5ab(0x1a7)][_0xd2a5ab(0x19a)]['BattleColorAdjust'];var _0x480513=_0x377abd[_0xd2a5ab(0x1d8)],_0x2f3193=_0x377abd[_0xd2a5ab(0x187)],_0x214cd1=_0x377abd['Saturate'];if(!!this[_0xd2a5ab(0x186)]()){var _0x5e6510=this[_0xd2a5ab(0x186)]()[_0xd2a5ab(0x1a2)];if(_0x5e6510[_0xd2a5ab(0x1f0)](/<COLOR ADJUST BRIGHTNESS: (.*)>/i))var _0x480513=Number(RegExp['$1'])||0x0;if(_0x5e6510[_0xd2a5ab(0x1f0)](/<COLOR ADJUST CONTRAST: (.*)>/i))var _0x2f3193=Number(RegExp['$1'])||0x0;if(_0x5e6510[_0xd2a5ab(0x1f0)](/<COLOR ADJUST SATURATE: (.*)>/i))var _0x214cd1=Number(RegExp['$1'])||0x0;}$gameScreen['setBrightEffectsColorAdjustSettings'](_0x480513,_0x2f3193,_0x214cd1,0x0);},VisuMZ[_0xe7c4f3(0x1a7)][_0xe7c4f3(0x1eb)]=Game_Map['prototype'][_0xe7c4f3(0x1b0)],Game_Map[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1b0)]=function(_0x16a980){var _0x1f11d5=_0xe7c4f3;VisuMZ[_0x1f11d5(0x1a7)][_0x1f11d5(0x1eb)]['call'](this,_0x16a980),!!$dataMap&&this['setupBrightEffectsFilters']();},Game_Map[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x19e)]=function(){var _0x57be70=_0xe7c4f3;if(ConfigManager[_0x57be70(0x1e7)]===![])return;this[_0x57be70(0x1ea)](),this['setupBrightEffectsGodrayFilter'](),this['setupBrightEffectsColorAdjustFilter'](),$gamePlayer[_0x57be70(0x1b2)]();},Game_Map[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1ea)]=function(){var _0x772ba7=_0xe7c4f3;const _0x53b42a=VisuMZ[_0x772ba7(0x1a7)]['Settings']['MapBloom'];var _0x18f88a=_0x53b42a[_0x772ba7(0x1c7)],_0x35f1af=_0x53b42a[_0x772ba7(0x1d8)],_0x25c462=_0x53b42a['Threshold'];this[_0x772ba7(0x171)]=undefined,this[_0x772ba7(0x1d9)]=undefined,this[_0x772ba7(0x193)]=undefined,this[_0x772ba7(0x1f4)]=undefined,this[_0x772ba7(0x198)]=undefined,this['_brightEffectsBloomVertThreshold']=undefined;if($dataMap){var _0x1badcd=$dataMap[_0x772ba7(0x1c5)];if(_0x1badcd[_0x772ba7(0x1f0)](/<BLOOM SCALE: (.*)>/i))var _0x18f88a=Number(RegExp['$1'])||0x0;if(_0x1badcd[_0x772ba7(0x1f0)](/<BLOOM BRIGHTNESS: (.*)>/i))var _0x35f1af=Number(RegExp['$1'])||0x0;if(_0x1badcd['match'](/<BLOOM THRESHOLD: (.*)>/i))var _0x25c462=Number(RegExp['$1'])||0x0;_0x1badcd[_0x772ba7(0x1f0)](/<BLOOM (?:HORZ|HORIZONTAL) SCALE: (.*) TO (.*)>/i)&&(this[_0x772ba7(0x171)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x772ba7(0x1d9)]=undefined),_0x1badcd[_0x772ba7(0x1f0)](/<BLOOM (?:VERT|VERTICAL) SCALE: (.*) TO (.*)>/i)&&(this[_0x772ba7(0x171)]=undefined,this['_brightEffectsBloomVertScale']=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x1badcd[_0x772ba7(0x1f0)](/<BLOOM (?:HORZ|HORIZONTAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this['_brightEffectsBloomHorzBrightness']=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x772ba7(0x1f4)]=undefined),_0x1badcd[_0x772ba7(0x1f0)](/<BLOOM (?:VERT|VERTICAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this['_brightEffectsBloomHorzBrightness']=undefined,this[_0x772ba7(0x1f4)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x1badcd[_0x772ba7(0x1f0)](/<BLOOM (?:HORZ|HORIZONTAL) THRESHOLD: (.*) TO (.*)>/i)&&(this[_0x772ba7(0x198)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsBloomVertThreshold']=undefined),_0x1badcd['match'](/<BLOOM (?:VERT|VERTICAL) THRESHOLD: (.*) TO (.*)>/i)&&(this['_brightEffectsBloomHorzThreshold']=undefined,this[_0x772ba7(0x1cb)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);}$gameScreen[_0x772ba7(0x1fb)](_0x18f88a,_0x35f1af,_0x25c462,0x0);},Game_Map['prototype'][_0xe7c4f3(0x168)]=function(){var _0x48c0cc=_0xe7c4f3;const _0x42ffb0=VisuMZ[_0x48c0cc(0x1a7)][_0x48c0cc(0x19a)][_0x48c0cc(0x1ca)];var _0x1e1592=_0x42ffb0[_0x48c0cc(0x197)],_0x52cb99=_0x42ffb0[_0x48c0cc(0x1b8)],_0x1859ab=_0x42ffb0[_0x48c0cc(0x185)],_0x19aac2=_0x42ffb0[_0x48c0cc(0x1e9)],_0x5defbb=_0x42ffb0[_0x48c0cc(0x1de)];this[_0x48c0cc(0x190)]=undefined,this[_0x48c0cc(0x189)]=undefined,this[_0x48c0cc(0x1c3)]=undefined,this[_0x48c0cc(0x1e0)]=undefined,this[_0x48c0cc(0x179)]=undefined,this[_0x48c0cc(0x1db)]=undefined,this[_0x48c0cc(0x17e)]=undefined,this[_0x48c0cc(0x1a6)]=undefined;if($dataMap){var _0x2be055=$dataMap[_0x48c0cc(0x1c5)];if(_0x2be055[_0x48c0cc(0x1f0)](/<GODRAY>/i))_0x1e1592=!![];else _0x2be055[_0x48c0cc(0x1f0)](/<NO GODRAY>/i)&&(_0x1e1592=![]);_0x2be055[_0x48c0cc(0x1f0)](/<GODRAY SPEED: (.*)>/i)&&(_0x52cb99=Number(RegExp['$1'])||0x0),_0x2be055[_0x48c0cc(0x1f0)](/<GODRAY GAIN: (.*)>/i)&&(_0x1859ab=Number(RegExp['$1'])||0x0),_0x2be055['match'](/<GODRAY LACUNARITY: (.*)>/i)&&(_0x19aac2=Number(RegExp['$1'])||0x0),_0x2be055['match'](/<GODRAY ANGLE: (.*)>/i)&&(_0x5defbb=Number(RegExp['$1'])||0x0),_0x2be055['match'](/<GODRAY (?:HORZ|HORIZONTAL) SPEED: (.*) TO (.*)>/i)&&(this[_0x48c0cc(0x190)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x48c0cc(0x189)]=undefined),_0x2be055[_0x48c0cc(0x1f0)](/<GODRAY (?:VERT|VERTICAL) SPEED: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzSpeed']=undefined,this['_brightEffectsGodrayVertSpeed']=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x2be055[_0x48c0cc(0x1f0)](/<GODRAY (?:HORZ|HORIZONTAL) GAIN: (.*) TO (.*)>/i)&&(this[_0x48c0cc(0x1c3)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x48c0cc(0x1e0)]=undefined),_0x2be055[_0x48c0cc(0x1f0)](/<GODRAY (?:VERT|VERTICAL) GAIN: (.*) TO (.*)>/i)&&(this[_0x48c0cc(0x1c3)]=undefined,this[_0x48c0cc(0x1e0)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x2be055[_0x48c0cc(0x1f0)](/<GODRAY (?:HORZ|HORIZONTAL) LACUNARITY: (.*) TO (.*)>/i)&&(this[_0x48c0cc(0x179)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x48c0cc(0x1db)]=undefined),_0x2be055[_0x48c0cc(0x1f0)](/<GODRAY (?:VERT|VERTICAL) LACUNARITY: (.*) TO (.*)>/i)&&(this[_0x48c0cc(0x179)]=undefined,this[_0x48c0cc(0x1db)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x2be055[_0x48c0cc(0x1f0)](/<GODRAY (?:HORZ|HORIZONTAL) ANGLE: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzAngle']=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x48c0cc(0x1a6)]=undefined),_0x2be055[_0x48c0cc(0x1f0)](/<GODRAY (?:VERT|VERTICAL) ANGLE: (.*) TO (.*)>/i)&&(this[_0x48c0cc(0x17e)]=undefined,this[_0x48c0cc(0x1a6)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);}$gameScreen[_0x48c0cc(0x1c9)](_0x1e1592,_0x52cb99,_0x1859ab,_0x19aac2,_0x5defbb,0x0);},Game_Map[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1b4)]=function(){var _0x68ebaf=_0xe7c4f3;const _0x4d909a=VisuMZ['BrightEffects']['Settings']['MapColorAdjust'];var _0x16ac73=_0x4d909a['Brightness'],_0x44da05=_0x4d909a[_0x68ebaf(0x187)],_0x40d03d=_0x4d909a[_0x68ebaf(0x1a8)];this[_0x68ebaf(0x1ba)]=undefined,this['_brightEffectsColorAdjustVertBrightness']=undefined,this[_0x68ebaf(0x1b7)]=undefined,this[_0x68ebaf(0x1d3)]=undefined,this[_0x68ebaf(0x167)]=undefined,this['_brightEffectsColorAdjustVertSaturate']=undefined;if($dataMap){var _0x185d9b=$dataMap[_0x68ebaf(0x1c5)];if(_0x185d9b[_0x68ebaf(0x1f0)](/<COLOR ADJUST BRIGHTNESS: (.*)>/i))var _0x16ac73=Number(RegExp['$1'])||0x0;if(_0x185d9b[_0x68ebaf(0x1f0)](/<COLOR ADJUST CONTRAST: (.*)>/i))var _0x44da05=Number(RegExp['$1'])||0x0;if(_0x185d9b['match'](/<COLOR ADJUST SATURATE: (.*)>/i))var _0x40d03d=Number(RegExp['$1'])||0x0;_0x185d9b[_0x68ebaf(0x1f0)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x68ebaf(0x1ba)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x68ebaf(0x19c)]=undefined),_0x185d9b[_0x68ebaf(0x1f0)](/<COLOR ADJUST (?:VERT|VERTICAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x68ebaf(0x1ba)]=undefined,this[_0x68ebaf(0x19c)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x185d9b[_0x68ebaf(0x1f0)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) CONTRAST: (.*) TO (.*)>/i)&&(this[_0x68ebaf(0x1b7)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x68ebaf(0x1d3)]=undefined),_0x185d9b[_0x68ebaf(0x1f0)](/<COLOR ADJUST (?:VERT|VERTICAL) CONTRAST: (.*) TO (.*)>/i)&&(this[_0x68ebaf(0x1b7)]=undefined,this[_0x68ebaf(0x1d3)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x185d9b['match'](/<COLOR ADJUST (?:HORZ|HORIZONTAL) SATURATE: (.*) TO (.*)>/i)&&(this['_brightEffectsColorAdjustHorzSaturate']=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsColorAdjustVertSaturate']=undefined),_0x185d9b[_0x68ebaf(0x1f0)](/<COLOR ADJUST (?:VERT|VERTICAL) SATURATE: (.*) TO (.*)>/i)&&(this[_0x68ebaf(0x167)]=undefined,this[_0x68ebaf(0x1ac)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);}$gameScreen['setBrightEffectsColorAdjustSettings'](_0x16ac73,_0x44da05,_0x40d03d,0x0);},VisuMZ[_0xe7c4f3(0x1a7)][_0xe7c4f3(0x166)]=Game_CharacterBase[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1e4)],Game_CharacterBase['prototype'][_0xe7c4f3(0x1e4)]=function(_0x37f6c3,_0x4ebe2e){var _0x13dfb6=_0xe7c4f3;VisuMZ[_0x13dfb6(0x1a7)]['Game_CharacterBase_locate'][_0x13dfb6(0x1c6)](this,_0x37f6c3,_0x4ebe2e),this===$gamePlayer&&this['updateMapBrightEffects']();},VisuMZ[_0xe7c4f3(0x1a7)]['Game_Player_update']=Game_Player[_0xe7c4f3(0x1a1)]['update'],Game_Player[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x176)]=function(_0x26e249){var _0x218241=_0xe7c4f3;VisuMZ[_0x218241(0x1a7)]['Game_Player_update'][_0x218241(0x1c6)](this,_0x26e249),this['updateMapBrightEffects']();},Game_Player[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1b2)]=function(){var _0x2c30b9=_0xe7c4f3;if(ConfigManager[_0x2c30b9(0x1e7)]===![])return;this[_0x2c30b9(0x1f5)](),this[_0x2c30b9(0x1f9)](),this[_0x2c30b9(0x1c0)]();},Game_Player[_0xe7c4f3(0x1a1)]['updateMapBrightEffectsAdvBloom']=function(){var _0x5bf41c=_0xe7c4f3,_0x16a34c=$gameScreen[_0x5bf41c(0x1f8)](),_0x14a1f3=_0x16a34c[_0x5bf41c(0x1d2)],_0x8c36d9=_0x16a34c[_0x5bf41c(0x196)],_0x2d0bd3=_0x16a34c[_0x5bf41c(0x1f2)];if($gameMap['_brightEffectsBloomHorzScale']!==undefined)var _0x5c9c42=$gameMap['_brightEffectsBloomHorzScale'][0x0],_0x5bc766=$gameMap[_0x5bf41c(0x171)][0x1]-_0x5c9c42,_0x2f3ee0=$gamePlayer[_0x5bf41c(0x1bc)]/$gameMap[_0x5bf41c(0x1ee)](),_0x14a1f3=_0x5c9c42+_0x5bc766*_0x2f3ee0;else{if($gameMap[_0x5bf41c(0x1d9)]!==undefined)var _0x5c9c42=$gameMap[_0x5bf41c(0x1d9)][0x0],_0x5bc766=$gameMap[_0x5bf41c(0x1d9)][0x1]-_0x5c9c42,_0x2f3ee0=$gamePlayer['_realY']/$gameMap['height'](),_0x14a1f3=_0x5c9c42+_0x5bc766*_0x2f3ee0;}if($gameMap['_brightEffectsBloomHorzBrightness']!==undefined)var _0x5c9c42=$gameMap[_0x5bf41c(0x193)][0x0],_0x5bc766=$gameMap[_0x5bf41c(0x193)][0x1]-_0x5c9c42,_0x2f3ee0=$gamePlayer[_0x5bf41c(0x1bc)]/$gameMap['width'](),_0x8c36d9=_0x5c9c42+_0x5bc766*_0x2f3ee0;else{if($gameMap[_0x5bf41c(0x1f4)]!==undefined)var _0x5c9c42=$gameMap[_0x5bf41c(0x1f4)][0x0],_0x5bc766=$gameMap[_0x5bf41c(0x1f4)][0x1]-_0x5c9c42,_0x2f3ee0=$gamePlayer['_realY']/$gameMap['height'](),_0x8c36d9=_0x5c9c42+_0x5bc766*_0x2f3ee0;}if($gameMap[_0x5bf41c(0x198)]!==undefined)var _0x5c9c42=$gameMap[_0x5bf41c(0x198)][0x0],_0x5bc766=$gameMap[_0x5bf41c(0x198)][0x1]-_0x5c9c42,_0x2f3ee0=$gamePlayer['_realX']/$gameMap[_0x5bf41c(0x1ee)](),_0x2d0bd3=_0x5c9c42+_0x5bc766*_0x2f3ee0;else{if($gameMap[_0x5bf41c(0x1cb)]!==undefined)var _0x5c9c42=$gameMap[_0x5bf41c(0x1cb)][0x0],_0x5bc766=$gameMap['_brightEffectsBloomVertThreshold'][0x1]-_0x5c9c42,_0x2f3ee0=$gamePlayer['_realY']/$gameMap[_0x5bf41c(0x1f3)](),_0x2d0bd3=_0x5c9c42+_0x5bc766*_0x2f3ee0;}$gameScreen['setBrightEffectsAdvBloomSettings'](_0x14a1f3,_0x8c36d9,_0x2d0bd3,_0x16a34c['duration']);},Game_Player[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1f9)]=function(){var _0x179634=_0xe7c4f3,_0x48e4d4=$gameScreen['getBrightEffectsGodraySettings'](),_0x5096bf=_0x48e4d4[_0x179634(0x1c8)],_0x201c00=_0x48e4d4[_0x179634(0x1cc)],_0x3b7b0a=_0x48e4d4[_0x179634(0x191)],_0x400a0a=_0x48e4d4[_0x179634(0x18d)],_0x395740=_0x48e4d4[_0x179634(0x1b1)];if($gameMap[_0x179634(0x190)]!==undefined)var _0x371c2b=$gameMap[_0x179634(0x190)][0x0],_0x59ebcc=$gameMap[_0x179634(0x190)][0x1]-_0x371c2b,_0x7408aa=$gamePlayer[_0x179634(0x1bc)]/$gameMap[_0x179634(0x1ee)](),_0x201c00=_0x371c2b+_0x59ebcc*_0x7408aa;else{if($gameMap[_0x179634(0x1d9)]!==undefined)var _0x371c2b=$gameMap['_brightEffectsGodrayVertSpeed'][0x0],_0x59ebcc=$gameMap['_brightEffectsGodrayVertSpeed'][0x1]-_0x371c2b,_0x7408aa=$gamePlayer[_0x179634(0x19d)]/$gameMap['height'](),_0x201c00=_0x371c2b+_0x59ebcc*_0x7408aa;}if($gameMap[_0x179634(0x1c3)]!==undefined)var _0x371c2b=$gameMap[_0x179634(0x1c3)][0x0],_0x59ebcc=$gameMap[_0x179634(0x1c3)][0x1]-_0x371c2b,_0x7408aa=$gamePlayer[_0x179634(0x1bc)]/$gameMap[_0x179634(0x1ee)](),_0x3b7b0a=_0x371c2b+_0x59ebcc*_0x7408aa;else{if($gameMap[_0x179634(0x1e0)]!==undefined)var _0x371c2b=$gameMap[_0x179634(0x1e0)][0x0],_0x59ebcc=$gameMap[_0x179634(0x1e0)][0x1]-_0x371c2b,_0x7408aa=$gamePlayer[_0x179634(0x19d)]/$gameMap[_0x179634(0x1f3)](),_0x3b7b0a=_0x371c2b+_0x59ebcc*_0x7408aa;}if($gameMap['_brightEffectsGodrayHorzLacunarity']!==undefined)var _0x371c2b=$gameMap[_0x179634(0x179)][0x0],_0x59ebcc=$gameMap[_0x179634(0x179)][0x1]-_0x371c2b,_0x7408aa=$gamePlayer[_0x179634(0x1bc)]/$gameMap[_0x179634(0x1ee)](),_0x400a0a=_0x371c2b+_0x59ebcc*_0x7408aa;else{if($gameMap['_brightEffectsGodrayVertLacunarity']!==undefined)var _0x371c2b=$gameMap['_brightEffectsGodrayVertLacunarity'][0x0],_0x59ebcc=$gameMap[_0x179634(0x1db)][0x1]-_0x371c2b,_0x7408aa=$gamePlayer[_0x179634(0x19d)]/$gameMap['height'](),_0x400a0a=_0x371c2b+_0x59ebcc*_0x7408aa;}if($gameMap[_0x179634(0x17e)]!==undefined)var _0x371c2b=$gameMap[_0x179634(0x17e)][0x0],_0x59ebcc=$gameMap[_0x179634(0x17e)][0x1]-_0x371c2b,_0x7408aa=$gamePlayer['_realX']/$gameMap[_0x179634(0x1ee)](),_0x395740=_0x371c2b+_0x59ebcc*_0x7408aa;else{if($gameMap['_brightEffectsGodrayVertAngle']!==undefined)var _0x371c2b=$gameMap[_0x179634(0x1a6)][0x0],_0x59ebcc=$gameMap[_0x179634(0x1a6)][0x1]-_0x371c2b,_0x7408aa=$gamePlayer['_realY']/$gameMap['height'](),_0x395740=_0x371c2b+_0x59ebcc*_0x7408aa;}$gameScreen[_0x179634(0x1c9)](_0x5096bf,_0x201c00,_0x3b7b0a,_0x400a0a,_0x395740,_0x48e4d4['duration']);},Game_Player['prototype'][_0xe7c4f3(0x1c0)]=function(){var _0x55e89b=_0xe7c4f3,_0x5d76a8=$gameScreen[_0x55e89b(0x1e6)](),_0x5e5c0e=_0x5d76a8[_0x55e89b(0x196)],_0x2a00d2=_0x5d76a8[_0x55e89b(0x181)],_0xf3d16=_0x5d76a8['saturate'];if($gameMap[_0x55e89b(0x1ba)]!==undefined)var _0x3d25b4=$gameMap[_0x55e89b(0x1ba)][0x0],_0x2e9036=$gameMap['_brightEffectsColorAdjustHorzBrightness'][0x1]-_0x3d25b4,_0x3f5472=$gamePlayer[_0x55e89b(0x1bc)]/$gameMap['width'](),_0x5e5c0e=_0x3d25b4+_0x2e9036*_0x3f5472;else{if($gameMap[_0x55e89b(0x19c)]!==undefined)var _0x3d25b4=$gameMap[_0x55e89b(0x19c)][0x0],_0x2e9036=$gameMap[_0x55e89b(0x19c)][0x1]-_0x3d25b4,_0x3f5472=$gamePlayer[_0x55e89b(0x19d)]/$gameMap[_0x55e89b(0x1f3)](),_0x5e5c0e=_0x3d25b4+_0x2e9036*_0x3f5472;}if($gameMap[_0x55e89b(0x1b7)]!==undefined)var _0x3d25b4=$gameMap[_0x55e89b(0x1b7)][0x0],_0x2e9036=$gameMap[_0x55e89b(0x1b7)][0x1]-_0x3d25b4,_0x3f5472=$gamePlayer[_0x55e89b(0x1bc)]/$gameMap[_0x55e89b(0x1ee)](),_0x2a00d2=_0x3d25b4+_0x2e9036*_0x3f5472;else{if($gameMap[_0x55e89b(0x1d3)]!==undefined)var _0x3d25b4=$gameMap[_0x55e89b(0x1d3)][0x0],_0x2e9036=$gameMap[_0x55e89b(0x1d3)][0x1]-_0x3d25b4,_0x3f5472=$gamePlayer[_0x55e89b(0x19d)]/$gameMap[_0x55e89b(0x1f3)](),_0x2a00d2=_0x3d25b4+_0x2e9036*_0x3f5472;}if($gameMap[_0x55e89b(0x167)]!==undefined)var _0x3d25b4=$gameMap[_0x55e89b(0x167)][0x0],_0x2e9036=$gameMap[_0x55e89b(0x167)][0x1]-_0x3d25b4,_0x3f5472=$gamePlayer[_0x55e89b(0x1bc)]/$gameMap['width'](),_0xf3d16=_0x3d25b4+_0x2e9036*_0x3f5472;else{if($gameMap[_0x55e89b(0x1ac)]!==undefined)var _0x3d25b4=$gameMap[_0x55e89b(0x1ac)][0x0],_0x2e9036=$gameMap[_0x55e89b(0x1ac)][0x1]-_0x3d25b4,_0x3f5472=$gamePlayer[_0x55e89b(0x19d)]/$gameMap[_0x55e89b(0x1f3)](),_0xf3d16=_0x3d25b4+_0x2e9036*_0x3f5472;}$gameScreen[_0x55e89b(0x170)](_0x5e5c0e,_0x2a00d2,_0xf3d16,_0x5d76a8['duration']);},VisuMZ[_0xe7c4f3(0x1a7)][_0xe7c4f3(0x16c)]=Spriteset_Base[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x18b)],Spriteset_Base[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x18b)]=function(){var _0x44849c=_0xe7c4f3;VisuMZ[_0x44849c(0x1a7)]['Spriteset_Base_createOverallFilters'][_0x44849c(0x1c6)](this),this[_0x44849c(0x172)]();},Spriteset_Base['prototype'][_0xe7c4f3(0x172)]=function(){var _0x4fd52a=_0xe7c4f3;if(ConfigManager[_0x4fd52a(0x1e7)]===![])return;this['filters']=this[_0x4fd52a(0x19f)]||[],this['createBrightEffectsAdvBloomFilter'](),this[_0x4fd52a(0x1cf)](),this['createBrightEffectsColorAdjustFilter'](),this[_0x4fd52a(0x17d)]();},Spriteset_Base['prototype'][_0xe7c4f3(0x1be)]=function(){var _0x23160a=_0xe7c4f3;this[_0x23160a(0x1e8)]=new PIXI[(_0x23160a(0x19f))][(_0x23160a(0x1af))](),this['filters'][_0x23160a(0x1e5)](this[_0x23160a(0x1e8)]);var _0x3c23a1=$gameScreen[_0x23160a(0x1f8)]();_0x3c23a1&&_0x3c23a1[_0x23160a(0x1df)]>0x0&&(this['_BrightEffectsAdvBloomFilter']['bloomScale']=_0x3c23a1['bloomScale'],this[_0x23160a(0x1e8)][_0x23160a(0x196)]=_0x3c23a1[_0x23160a(0x196)],this[_0x23160a(0x1e8)][_0x23160a(0x1f2)]=_0x3c23a1[_0x23160a(0x1f2)]);},Spriteset_Base[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1cf)]=function(){var _0x5f38a1=_0xe7c4f3;this[_0x5f38a1(0x1d1)]=new PIXI[(_0x5f38a1(0x19f))][(_0x5f38a1(0x1ed))](),this['_BrightEffectsGodrayFilter'][_0x5f38a1(0x1dd)]=![],this['_BrightEffectsGodrayFilter'][_0x5f38a1(0x1cd)]=0x0,this[_0x5f38a1(0x19f)][_0x5f38a1(0x1e5)](this[_0x5f38a1(0x1d1)]);var _0x1a1fbe=$gameScreen['getBrightEffectsGodraySettings']();_0x1a1fbe&&_0x1a1fbe[_0x5f38a1(0x1df)]>0x0&&(this[_0x5f38a1(0x1d1)][_0x5f38a1(0x1cc)]=_0x1a1fbe[_0x5f38a1(0x1cc)],this['_BrightEffectsGodrayFilter'][_0x5f38a1(0x191)]=_0x1a1fbe[_0x5f38a1(0x191)],this['_BrightEffectsGodrayFilter']['lacunarity']=_0x1a1fbe[_0x5f38a1(0x18d)],this[_0x5f38a1(0x1d1)]['angle']=_0x1a1fbe[_0x5f38a1(0x1b1)]);},Spriteset_Base['prototype'][_0xe7c4f3(0x16a)]=function(){var _0x16e45c=_0xe7c4f3;this[_0x16e45c(0x17a)]=new PIXI[(_0x16e45c(0x19f))][(_0x16e45c(0x1a0))](),this[_0x16e45c(0x19f)][_0x16e45c(0x1e5)](this[_0x16e45c(0x17a)]);var _0x2b1411=$gameScreen[_0x16e45c(0x1e6)]();_0x2b1411&&_0x2b1411['duration']>0x0&&(this['_BrightEffectsColorAdjustFilter'][_0x16e45c(0x188)]=_0x2b1411[_0x16e45c(0x196)],this[_0x16e45c(0x17a)][_0x16e45c(0x1c1)]=_0x2b1411['contrast'],this['_BrightEffectsColorAdjustFilter'][_0x16e45c(0x1f6)]=_0x2b1411['saturate']);},VisuMZ[_0xe7c4f3(0x1a7)][_0xe7c4f3(0x1bd)]=Spriteset_Base['prototype']['update'],Spriteset_Base[_0xe7c4f3(0x1a1)]['update']=function(){var _0x1d58e1=_0xe7c4f3;VisuMZ[_0x1d58e1(0x1a7)][_0x1d58e1(0x1bd)][_0x1d58e1(0x1c6)](this),this[_0x1d58e1(0x17d)]();},Spriteset_Base['prototype'][_0xe7c4f3(0x17d)]=function(){var _0x26e16b=_0xe7c4f3;this['updateBrightEffectsAdvBloomFilter'](),this[_0x26e16b(0x1bb)](),this[_0x26e16b(0x1ec)]();},Spriteset_Base['prototype'][_0xe7c4f3(0x1b5)]=function(){var _0x45ccc0=_0xe7c4f3;if(!!this[_0x45ccc0(0x1e8)]){var _0x647bc2=$gameScreen['getBrightEffectsAdvBloomSettings'](),_0x50e860=_0x647bc2[_0x45ccc0(0x1df)];_0x50e860<=0x0?(this['_BrightEffectsAdvBloomFilter']['bloomScale']=_0x647bc2[_0x45ccc0(0x1d2)],this['_BrightEffectsAdvBloomFilter']['brightness']=_0x647bc2['brightness'],this[_0x45ccc0(0x1e8)][_0x45ccc0(0x1f2)]=_0x647bc2[_0x45ccc0(0x1f2)]):(_0x647bc2[_0x45ccc0(0x1df)]--,this[_0x45ccc0(0x1e8)][_0x45ccc0(0x1d2)]=(this[_0x45ccc0(0x1e8)][_0x45ccc0(0x1d2)]*(_0x50e860-0x1)+_0x647bc2[_0x45ccc0(0x1d2)])/_0x50e860,this[_0x45ccc0(0x1e8)]['brightness']=(this[_0x45ccc0(0x1e8)]['brightness']*(_0x50e860-0x1)+_0x647bc2[_0x45ccc0(0x196)])/_0x50e860,this[_0x45ccc0(0x1e8)][_0x45ccc0(0x1f2)]=(this[_0x45ccc0(0x1e8)][_0x45ccc0(0x1f2)]*(_0x50e860-0x1)+_0x647bc2[_0x45ccc0(0x1f2)])/_0x50e860);}},Spriteset_Base[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1bb)]=function(){var _0x599470=_0xe7c4f3;if(!!this[_0x599470(0x1d1)]){var _0xea9118=$gameScreen[_0x599470(0x1dc)](),_0x641c85=_0xea9118['duration'];_0x641c85<=0x0?(this[_0x599470(0x1d1)]['speed']=_0xea9118['speed'],this['_BrightEffectsGodrayFilter'][_0x599470(0x191)]=_0xea9118[_0x599470(0x191)],this[_0x599470(0x1d1)][_0x599470(0x18d)]=_0xea9118['lacunarity'],this[_0x599470(0x1d1)]['angle']=_0xea9118[_0x599470(0x1b1)]):(_0xea9118[_0x599470(0x1df)]--,this[_0x599470(0x1d1)][_0x599470(0x1cc)]=(this[_0x599470(0x1d1)][_0x599470(0x1cc)]*(_0x641c85-0x1)+_0xea9118[_0x599470(0x1cc)])/_0x641c85,this[_0x599470(0x1d1)]['gain']=(this[_0x599470(0x1d1)][_0x599470(0x191)]*(_0x641c85-0x1)+_0xea9118[_0x599470(0x191)])/_0x641c85,this['_BrightEffectsGodrayFilter']['lacunarity']=(this[_0x599470(0x1d1)][_0x599470(0x18d)]*(_0x641c85-0x1)+_0xea9118[_0x599470(0x18d)])/_0x641c85,this[_0x599470(0x1d1)]['angle']=(this[_0x599470(0x1d1)][_0x599470(0x1b1)]*(_0x641c85-0x1)+_0xea9118[_0x599470(0x1b1)])/_0x641c85),this[_0x599470(0x1d1)][_0x599470(0x1cd)]+=this[_0x599470(0x1d1)][_0x599470(0x1cc)],this[_0x599470(0x1d1)]['enabled']=_0xea9118[_0x599470(0x1c8)];}},Spriteset_Base[_0xe7c4f3(0x1a1)][_0xe7c4f3(0x1ec)]=function(){var _0x23ad93=_0xe7c4f3;if(!!this[_0x23ad93(0x17a)]){var _0x40549d=$gameScreen[_0x23ad93(0x1e6)](),_0x499948=_0x40549d[_0x23ad93(0x1df)];_0x499948<=0x0?(this[_0x23ad93(0x17a)][_0x23ad93(0x188)]=_0x40549d[_0x23ad93(0x196)],this[_0x23ad93(0x17a)][_0x23ad93(0x1c1)]=_0x40549d['contrast'],this[_0x23ad93(0x17a)][_0x23ad93(0x1f6)]=_0x40549d[_0x23ad93(0x1a4)]):(_0x40549d[_0x23ad93(0x1df)]--,this['_BrightEffectsColorAdjustFilter'][_0x23ad93(0x188)]=(this[_0x23ad93(0x17a)]['currentBrightness']*(_0x499948-0x1)+_0x40549d[_0x23ad93(0x196)])/_0x499948,this['_BrightEffectsColorAdjustFilter']['currentContrast']=(this[_0x23ad93(0x17a)][_0x23ad93(0x1c1)]*(_0x499948-0x1)+_0x40549d[_0x23ad93(0x181)])/_0x499948,this[_0x23ad93(0x17a)][_0x23ad93(0x1f6)]=(this[_0x23ad93(0x17a)][_0x23ad93(0x1f6)]*(_0x499948-0x1)+_0x40549d['saturate'])/_0x499948),this['_BrightEffectsColorAdjustFilter'][_0x23ad93(0x196)](this['_BrightEffectsColorAdjustFilter'][_0x23ad93(0x188)]),this[_0x23ad93(0x17a)][_0x23ad93(0x181)](this[_0x23ad93(0x17a)]['currentContrast'],!![]),this[_0x23ad93(0x17a)][_0x23ad93(0x1a4)](this[_0x23ad93(0x17a)][_0x23ad93(0x1f6)],!![]);}};