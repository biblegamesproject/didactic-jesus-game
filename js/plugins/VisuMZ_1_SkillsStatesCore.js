//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.17] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x58e8=['83Iplojj','ParseSkillNotetags','statusWindowRect','HqcqN','ShowShopStatus','sksZH','setStateRetainType','checkSkillConditionsSwitchNotetags','adjustItemWidthByShopStatus','YcrSU','initialize','isStateRestrict','drawActorIcons','363334gLdPTO','createItemWindow','SkillSceneAdjustSkillList','round','mpCost','commandNameWindowDrawText','DisplayedParams','FKwUG','skillTpCost','ActionEndUpdate','passiveStates','osDJn','bQnLj','createCommandNameWindow','isStateAddable','setup','AJAQS','koWNw','onAddBuff','_commandNameWindow','gbPrG','XEvTd','toUpperCase','fRYCX','Game_Battler_isStateAddable','windowPadding','currentMaxValue','onAddDebuffJS','gBYMh','onExpireBuffJS','damage','MaxTurns','isActor','_stateSteps','PassiveStates','kSOqe','fontSize','updateTurnDisplaySprite','oJnRu','zxXWd','currentValue','xIJkr','ManRA','helpWindowRectSkillsStatesCore','OvbVG','success','GoItC','%1\x20%2\x20%3','EyWWl','match','\x5cI[%1]%2','heal','skillEnableJS','PYekQ','stateMpSlipDamageJS','addDebuff','Scene_Boot_onDatabaseLoaded','acgfb','applyDebuffTurnManipulationEffects','push','KqTxg','passiveStateObjects','inBattle','_stypeId','stateAddJS','SkillMenuStatusRect','_tempBattler','StackBuffMax','GuHuQ','ARRAYJSON','onEraseStateCustomJS','makeSuccess','makeCommandList','_classIDs','stateId','DataOffsetX','eraseState','drawActorBuffRates','_stateIDs','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','jLyKs','LyDtp','fzHdt','removeStatesByCategory','AqrFq','states','hCbDC','xdpVn','stateMaximumTurns','gainHp','UFQzA','DpMTS','XoTzm','iBGbs','cQjzY','isStateRemoved','SwecZ','_skillTypeWindow','right','VHXhN','addPassiveStatesByNotetag','TZvTI','_costSettings','uhNhf','trim','calcWindowHeight','Game_BattlerBase_increaseBuff','MAT','addCommand','isUseModernControls','clear','boxWidth','_stored_state-%1-color','ewovr','buffIconIndex','die','helpAreaHeight','Game_Action_applyItemUserEffect','retrieveStateColor','BattleHiddenSkillTypes','TTlMZ','enemy','LjgaM','recover\x20all','55667OcqOGV','ZLnxx','slipMp','onExpireBuffGlobalJS','_hidden','clearStateData','Window_SkillList_maxCols','DmdZS','Costs','_animationIndex','_buffs','_cache','setupSkillsStatesCore','_subject','gradientFillRect','debuffTurns','getStateDisplay','sXcVl','isAlive','_stored_buffColor','convertPassiveStates','nEkgU','fontBold','createTurnDisplaySprite','isMaxDebuffAffected','CanPayJS','ReapplyRules','ZJpxB','BaYUh','gaugeLineHeight','Scene_Skill_statusWindowRect','isAllDead','Rfcaq','fukRg','buffLength','Sprite_Gauge_redraw','redraw','addState','commandStyle','checkShowHideBattleNotetags','Game_BattlerBase_resetStateCounts','ULRzX','ypdIi','maxItems','HiddenSkillTypes','setDebuffTurns','createShopStatusWindow','tpCost','usableSkills','onDatabaseLoaded','LrIKS','updateCommandNameWindow','Parse_Notetags_Skill_JS','Parse_Notetags_State_ApplyRemoveLeaveJS','isBuffPrevented','statesByCategory','TextJS','hasStateCategory','meetsSkillConditionsGlobalJS','ShowTurns','279965eaCwRp','stateExpireJS','exit','IconStypeNorm','qBRGU','ARRAYEVAL','isStateCategoryAffected','Game_BattlerBase_buffIconIndex','makeCommandName','Scene_Skill_skillTypeWindowRect','GaugeMaxJS','itemTextAlign','user','SkillSceneStatusBgType','MMwxR','sfZWp','uYgfL','death','Game_BattlerBase_eraseState','drawItem','currentClass','width','ANY','_stored_debuffColor','_buffTurns','removeStatesByCategoryAll','totalStateCategory','UsRaM','meetsPassiveStateConditionClasses','DUywi','icon','onAddStateJS','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Game_Actor_skillTypes','2684acYyZd','zIiQH','KZUOl','Parse_Notetags_State_SlipEffectJS','process_VisuMZ_SkillsStatesCore_State_Notetags','totalStateCategoryAffected','Window_StatusBase_placeGauge','hTdwr','onAddStateMakeCustomSlipValues','HVgvs','Window_SkillType_initialize','setBuffTurns','drawSkillCost','onAddDebuff','clearStateOrigin','#%1','skillId','initMembersSkillsStatesCore','uzVDx','autoRemovalTiming','aFJyY','sort','isCommandEnabled','constructor','stateTpSlipHealJS','ParseStateNotetags','equips','multiclasses','Game_BattlerBase_states','description','NUM','ZzaAe','Window_StatusBase_drawActorIcons','commandStyleCheck','voOrS','testApply','VajHj','lFMbC','QXuuX','_scene','decreaseBuff','DwaTw','%1%','removeBuffsAuto','menuActor','iconText','pKMmQ','setStateOrigin','VpVCa','_stateMaxTurns','onAddBuffGlobalJS','29846Myeafs','DEF','ColorBuff','innerWidth','buttonAssistSwitch','_stateRetainType','aliveMembers','_colorCache','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','uiHelpPosition','name','isLearnedSkill','xrbdh','ListWindowCols','skillVisibleJS','iUMfh','1zydQGU','checkSkillTypeMatch','convertTargetToStateOriginKey','setItem','removeStatesAuto','createSkillCostText','ShowJS','NspIe','AroQC','Game_Battler_addBuff','statusWindowRectSkillsStatesCore','center','contents','onExpireDebuffGlobalJS','_itemWindow','eraseBuff','checkShowHideSkillNotetags','AGI','priority','resetFontSettings','gyZSF','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','setStateData','removeBuff','<actor-%1>','iTsjo','drawExtendedParameter','mainCommandWidth','actor','shopStatusWindowRect','version','ylNhy','currentValueSkillsStatesCore','Skills','resetTextColor','isStateAffected','ParseAllNotetags','_currentActor','saEkQ','onExpireStateJS','ceil','VisuMZ_0_CoreEngine','<troop-%1>','DzdOK','itemWindowRect','drawActorStateData','canPaySkillCost','DHRRH','Game_Troop_setup','Name','normalColor','addChild','onExpireStateCustomJS','Game_Battler_addDebuff','height','getStateData','groupDefeat','stateHpSlipDamageJS','Parse_Notetags_State_Category','frameCount','weFUr','ablEB','VisuMZ_1_MainMenuCore','PkZDF','oBAIO','gdEuB','Window_SkillList_updateHelp','canUse','LUK','mWrPk','befUC','wxtXM','Window_SkillList_setActor','onEraseBuffGlobalJS','buffColor','drawItemStyleIcon','Sprite_Gauge_setup','actorId','slipHp','slipTp','TurnOffsetY','mainAreaTop','_shopStatusWindow','getColorDataFromPluginParameters','textSizeEx','isStateResist','toLowerCase','_tempActor','clearStatesWithStateRetain','ILsqn','States','PIwiR','dHfdi','Settings','skillCostSeparator','Game_BattlerBase_skillTpCost','iAWqO','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isBuffOrDebuffAffected','UjAaA','applyStateTurnManipulationEffects','shopStatusWindowRectSkillsStatesCore','UvgBS','commandNameWindowCenter','uiMenuStyle','VisuMZ_2_ClassChangeSystem','updateStatesActionEnd','155999eIEcKw','7efjqgd','skillMpCost','_skillIDs','statusWidth','skillTypeWindowRectSkillsStatesCore','BattleManager_endAction','Game_BattlerBase_meetsSkillConditions','paySkillCost','log','getColor','gXZpQ','isSkillUsableForAutoBattle','onEraseStateGlobalJS','clearStates','isUseSkillsStatesCoreUpdatedLayout','bitmap','applyItemUserEffect','addPassiveStatesByPluginParameters','_result','jbEPJ','mainFontFace','_categoryWindow','gvCKo','onAddBuffJS','process_VisuMZ_SkillsStatesCore_Notetags','prototype','setStatusWindow','Scene_Skill_createItemWindow','LayoutStyle','PassiveConditionJS','getStateOriginByKey','Window_SkillList_drawItem','oHBpd','checkShowHideJS','length','MAXHP','Scene_Skill_itemWindowRect','VisuMZ_1_ElementStatusCore','isDebuffAffected','VCnOM','untitled','QiWBG','FqDWo','kAdUn','Window_SkillList_includes','PNuUr','none','onEraseDebuff','isPassiveStateStackable','getClassIdWithName','add','Game_BattlerBase_clearStates','Game_BattlerBase_initMembers','onRegenerateCustomStateDamageOverTime','Enemy','isPlaytest','_checkingPassiveStates','ziNbl','ShowData','ATK','drawActorIconsAllTurnCounters','outlineColor','_stateOrigin','CoreEngine','onEraseStateJS','createAllSkillCostText','innerHeight','TvHEm','Sprite_Gauge_gaugeRate','itemWindowRectSkillsStatesCore','convertGaugeTypeSkillsStatesCore','NEGATIVE','Param','floor','Actor','anchor','drawExtendedSkillsStatesCoreStatus','paICq','meetsPassiveStateConditionJS','PDqLh','IJcLR','FEDen','index','gaugeBackColor','makeCurrentTroopUniqueID','mainFontSize','item','commandNameWindowDrawBackground','buffTurns','Game_Unit_isAllDead','jkdkE','Game_BattlerBase_decreaseBuff','drawFullGauge','_states','Global','onExpireBuff','maxSlipDamage','Game_BattlerBase_skillMpCost','statePassiveConditionJS','TwtKs','<enemy-%1>','map','LYlOq','byiUS','fwfGn','status','RnccY','format','rfqSc','GaugeDrawJS','canClearState','_stypeIDs','DataFontSize','QWVSk','OiKgH','56861wPuJJK','JSON','GaugeCurrentJS','yqGII','drawText','addDebuffTurns','skillTypeWindowRect','setStateTurns','indexOf','etTYE','itemAt','uiInputPosition','currentMaxValueSkillsStatesCore','MsXLh','XAaMk','Window_SkillStatus_refresh','stateTpSlipDamageJS','IuFIE','BvlYT','updateHelp','jNTAc','currentDisplayedValue','ParseClassIDs','stateColor','meetsPassiveStateConditions','TUdqm','getStateOrigin','max','redrawSkillsStatesCore','wQldm','onExpireState','Buffs','PayJS','number','gLmwa','TurnOffsetX','meetsPassiveStateGlobalConditionJS','keys','callUpdateHelp','DataOffsetY','parse','MDF','QapYc','_stateDisplay','addBuffTurns','addWindow','state','Sprite_StateIcon_updateFrame','skill','regenerateAll','ARRAYSTR','changeOutlineColor','QGFSR','includesSkillsStatesCore','xYkbg','changeTextColor','allowCreateShopStatusWindow','ColorNegative','qUjGU','DRHVd','makeAdditionalSkillCostText','Parse_Notetags_State_PassiveJS','shopStatusWidth','return\x200','rXjIS','GroupDigits','gaugeRate','skillTypes','remove','_stateData','yjMlx','helpWindowRect','setActor','getCurrentStateOriginKey','ZxlYs','buttonAssistText1','call','meetsSkillConditionsEnableJS','_stateTurns','changePaintOpacity','regenerateAllSkillsStatesCore','Game_Battler_regenerateAll','isBuffExpired','19awfsMb','11yTRUVW','stypeId','zKfgy','drawParamText','Game_Battler_addState','replace','increaseBuff','KcePu','Game_BattlerBase_eraseBuff','MAXMP','YubwG','drawIcon','Sprite_Gauge_initMembers','GXddf','cYIcD','CalcJS','Scene_Skill_helpWindowRect','initMembers','onAddStateGlobalJS','onEraseDebuffGlobalJS','rgba(0,\x200,\x200,\x201)','ChkxL','ColorPositive','getCurrentStateActiveUser','isMaxBuffAffected','stateEraseJS','Game_BattlerBase_refresh','onAddStateCustomJS','reset','yzOdq','updateFrame','Parse_Notetags_Skill_Cost','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','isPartyAllAffectedByGroupDefeatStates','ARRAYSTRUCT','commandName','setStypeId','YftAw','drawActorStateTurns','isSkillCostShown','isStateExpired','Vqrga','isRightInputMode','members','nddUR','getStateReapplyRulings','drawTextEx','value','_actor','clearStateRetainType','setBackgroundType','qvMsC','xgQwx','dbdef','paramBuffRate','Sprite_Gauge_currentValue','fillRect','_battler','updateVisibility','overwriteBuffTurns','stateMpSlipHealJS','_currentTroopUniqueID','Sprite_Gauge_currentMaxValue','getStateIdWithName','onExpireDebuffJS','Game_Actor_forgetSkill','PBlxq','drawItemStyleIconText','XdYcc','hasSkill','ZqRSt','placeGauge','SkillsStatesCore','hasState','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','gLYFR','includes','Sprite_StateIcon_loadBitmap','applySkillsStatesCoreEffects','ignore','onExpireDebuff','_checkingVisuMzPassiveStateObjects','_turnDisplaySprite','skills','gdIsv','JqooY','checkShowHideNotetags','removeState','forgetSkill','ezrBo','maxCols','clamp','test','drawActorBuffTurns','concat','onEraseBuffJS','process_VisuMZ_SkillsStatesCore_Skill_Notetags','clearStateDisplay','recoverAll','addStateTurns','resetStateCounts','itemLineRect','filter','alUJd','onExpireStateGlobalJS','text','STRUCT','scrollTo','loadBitmap','MNfPc','iconHeight','yjvrW','refresh','Game_BattlerBase_recoverAll','aptrP','isBuffAffected','okDsk','stateTurns','Game_BattlerBase_overwriteBuffTurns','meetsSkillConditions','_skills','slice','getCurrentTroopUniqueID','testSkillStatesCoreNotetags','updatedLayoutStyle','actions','Pdeun','SUUPN','Game_BattlerBase_die','buff','CmdStyle','xvbDf','onEraseBuff','Game_Actor_learnSkill','note','useDigitGrouping','categories','onRemoveState','iconIndex','getSkillTypes','fXXQi','iconWidth','ConvertParams','stateData','PRgMR','greater','_statusWindow','WMhxp','stateHpSlipHealJS','YmWad','ARRAYNUM','meetsPassiveStateConditionSwitches','VisuMZ_1_ItemsEquipsCore','debuffColor','Game_Action_testApply','onAddState','applyBuffTurnManipulationEffects','textColor','onAddDebuffGlobalJS','checkSkillConditionsNotetags','getSkillIdWithName','endAction','split'];const _0x191967=_0x3a6a;(function(_0x20e3fd,_0x2beb28){const _0x77dc0e=_0x3a6a;while(!![]){try{const _0x1fa3f7=parseInt(_0x77dc0e(0x4b4))+-parseInt(_0x77dc0e(0x3fc))+parseInt(_0x77dc0e(0x284))*parseInt(_0x77dc0e(0x285))+parseInt(_0x77dc0e(0x219))*parseInt(_0x77dc0e(0x209))+-parseInt(_0x77dc0e(0x478))*parseInt(_0x77dc0e(0x34b))+parseInt(_0x77dc0e(0x3ef))*parseInt(_0x77dc0e(0x4d6))+-parseInt(_0x77dc0e(0x34c))*-parseInt(_0x77dc0e(0x2f8));if(_0x1fa3f7===_0x2beb28)break;else _0x20e3fd['push'](_0x20e3fd['shift']());}catch(_0x4db3a4){_0x20e3fd['push'](_0x20e3fd['shift']());}}}(_0x58e8,0xca670));var label=_0x191967(0x394),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x191967(0x3b2)](function(_0x29a7ec){const _0x575b53=_0x191967;return _0x29a7ec[_0x575b53(0x2ee)]&&_0x29a7ec['description'][_0x575b53(0x398)]('['+label+']');})[0x0];function _0x3a6a(_0x3301ad,_0xc598b4){_0x3301ad=_0x3301ad-0x1ef;let _0x58e8e3=_0x58e8[_0x3301ad];return _0x58e8e3;}VisuMZ[label][_0x191967(0x276)]=VisuMZ[label][_0x191967(0x276)]||{},VisuMZ[_0x191967(0x3da)]=function(_0x39cdbf,_0x677647){const _0x3ef0a4=_0x191967;for(const _0x424203 in _0x677647){if(_0x3ef0a4(0x411)===_0x3ef0a4(0x259)){function _0x518dcc(){const _0x435b5d=_0x3ef0a4,_0x38a5c2=this['states']();for(const _0x2d2c5c of _0x38a5c2){if(_0x2d2c5c&&this[_0x435b5d(0x2f3)](_0x2d2c5c))this['eraseState'](_0x2d2c5c['id']);}this[_0x435b5d(0x483)]={};}}else{if(_0x424203[_0x3ef0a4(0x42d)](/(.*):(.*)/i)){const _0x5d4c9e=String(RegExp['$1']),_0xf20c05=String(RegExp['$2'])[_0x3ef0a4(0x412)]()[_0x3ef0a4(0x464)]();let _0x76efe6,_0x14497c,_0x4c16e9;switch(_0xf20c05){case _0x3ef0a4(0x1f4):_0x76efe6=_0x677647[_0x424203]!==''?Number(_0x677647[_0x424203]):0x0;break;case _0x3ef0a4(0x3e2):_0x14497c=_0x677647[_0x424203]!==''?JSON[_0x3ef0a4(0x320)](_0x677647[_0x424203]):[],_0x76efe6=_0x14497c[_0x3ef0a4(0x2ea)](_0x5a60ce=>Number(_0x5a60ce));break;case'EVAL':_0x76efe6=_0x677647[_0x424203]!==''?eval(_0x677647[_0x424203]):null;break;case _0x3ef0a4(0x4b9):_0x14497c=_0x677647[_0x424203]!==''?JSON['parse'](_0x677647[_0x424203]):[],_0x76efe6=_0x14497c[_0x3ef0a4(0x2ea)](_0x95d638=>eval(_0x95d638));break;case _0x3ef0a4(0x2f9):_0x76efe6=_0x677647[_0x424203]!==''?JSON['parse'](_0x677647[_0x424203]):'';break;case _0x3ef0a4(0x441):_0x14497c=_0x677647[_0x424203]!==''?JSON[_0x3ef0a4(0x320)](_0x677647[_0x424203]):[],_0x76efe6=_0x14497c[_0x3ef0a4(0x2ea)](_0x3d0d46=>JSON[_0x3ef0a4(0x320)](_0x3d0d46));break;case'FUNC':_0x76efe6=_0x677647[_0x424203]!==''?new Function(JSON[_0x3ef0a4(0x320)](_0x677647[_0x424203])):new Function(_0x3ef0a4(0x337));break;case'ARRAYFUNC':_0x14497c=_0x677647[_0x424203]!==''?JSON['parse'](_0x677647[_0x424203]):[],_0x76efe6=_0x14497c[_0x3ef0a4(0x2ea)](_0x22d075=>new Function(JSON[_0x3ef0a4(0x320)](_0x22d075)));break;case'STR':_0x76efe6=_0x677647[_0x424203]!==''?String(_0x677647[_0x424203]):'';break;case _0x3ef0a4(0x32a):_0x14497c=_0x677647[_0x424203]!==''?JSON[_0x3ef0a4(0x320)](_0x677647[_0x424203]):[],_0x76efe6=_0x14497c[_0x3ef0a4(0x2ea)](_0x4a7ac5=>String(_0x4a7ac5));break;case _0x3ef0a4(0x3b6):_0x4c16e9=_0x677647[_0x424203]!==''?JSON[_0x3ef0a4(0x320)](_0x677647[_0x424203]):{},_0x39cdbf[_0x5d4c9e]={},VisuMZ[_0x3ef0a4(0x3da)](_0x39cdbf[_0x5d4c9e],_0x4c16e9);continue;case _0x3ef0a4(0x36e):_0x14497c=_0x677647[_0x424203]!==''?JSON[_0x3ef0a4(0x320)](_0x677647[_0x424203]):[],_0x76efe6=_0x14497c['map'](_0xdb77d8=>VisuMZ[_0x3ef0a4(0x3da)]({},JSON['parse'](_0xdb77d8)));break;default:continue;}_0x39cdbf[_0x5d4c9e]=_0x76efe6;}}}return _0x39cdbf;},(_0x13694a=>{const _0x5c2deb=_0x191967,_0x47ec8c=_0x13694a['name'];for(const _0x20c715 of dependencies){if(!Imported[_0x20c715]){if(_0x5c2deb(0x232)!=='iTsjo'){function _0x3244e6(){const _0x6c3e9e=_0x5c2deb;this[_0x6c3e9e(0x207)][_0x515537]=_0x19ec79[_0x6c3e9e(0x394)][_0x6c3e9e(0x276)]['States'][_0x6c3e9e(0x41b)];}}else{alert(_0x5c2deb(0x27a)['format'](_0x47ec8c,_0x20c715)),SceneManager['exit']();break;}}}const _0x26c401=_0x13694a[_0x5c2deb(0x1f3)];if(_0x26c401[_0x5c2deb(0x42d)](/\[Version[ ](.*?)\]/i)){if('vIivZ'!==_0x5c2deb(0x30c)){const _0xce3f3c=Number(RegExp['$1']);_0xce3f3c!==VisuMZ[label][_0x5c2deb(0x237)]&&(alert(_0x5c2deb(0x4d4)['format'](_0x47ec8c,_0xce3f3c)),SceneManager['exit']());}else{function _0x1ab75a(){const _0x37e4ea=_0x5c2deb;_0x4310d5['SkillsStatesCore'][_0x37e4ea(0x25b)][_0x37e4ea(0x344)](this),this[_0x37e4ea(0x3de)]&&this[_0x37e4ea(0x3de)][_0x37e4ea(0x4ed)]===_0x3fbfb3&&this[_0x37e4ea(0x3de)][_0x37e4ea(0x21c)](this[_0x37e4ea(0x2db)]());}}}if(_0x26c401[_0x5c2deb(0x42d)](/\[Tier[ ](\d+)\]/i)){if(_0x5c2deb(0x3d8)===_0x5c2deb(0x22d)){function _0xaea867(){const _0x3c3079=_0x5c2deb;_0x5c5f83[_0x3c3079(0x394)][_0x3c3079(0x3f0)][_0x3c3079(0x344)](this,_0x4464e4),_0x1f53da[_0x3c3079(0x394)][_0x3c3079(0x36b)](_0x42df37),_0x54fa9b[_0x3c3079(0x394)][_0x3c3079(0x4ac)](_0xf47114);}}else{const _0x4e1fe9=Number(RegExp['$1']);_0x4e1fe9<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5c2deb(0x2f0)](_0x47ec8c,_0x4e1fe9,tier)),SceneManager[_0x5c2deb(0x4b6)]()):tier=Math[_0x5c2deb(0x313)](_0x4e1fe9,tier);}}VisuMZ[_0x5c2deb(0x3da)](VisuMZ[label][_0x5c2deb(0x276)],_0x13694a['parameters']);})(pluginData),VisuMZ[_0x191967(0x394)][_0x191967(0x434)]=Scene_Boot[_0x191967(0x29e)]['onDatabaseLoaded'],Scene_Boot[_0x191967(0x29e)][_0x191967(0x4a9)]=function(){const _0x2b17df=_0x191967;VisuMZ[_0x2b17df(0x394)]['Scene_Boot_onDatabaseLoaded'][_0x2b17df(0x344)](this),this[_0x2b17df(0x29d)]();},Scene_Boot[_0x191967(0x29e)][_0x191967(0x29d)]=function(){const _0x59e7cc=_0x191967;if(VisuMZ[_0x59e7cc(0x23d)])return;this[_0x59e7cc(0x3ac)](),this[_0x59e7cc(0x4da)]();},Scene_Boot[_0x191967(0x29e)][_0x191967(0x3ac)]=function(){const _0x3f2ec8=_0x191967;for(const _0x10bec8 of $dataSkills){if(_0x3f2ec8(0x2ec)!==_0x3f2ec8(0x2ec)){function _0x5dbf93(){const _0x8d3af5=_0x3f2ec8;if(!_0x62b138[_0x8d3af5(0x37b)](_0x2955e4))return!![];}}else{if(!_0x10bec8)continue;VisuMZ[_0x3f2ec8(0x394)][_0x3f2ec8(0x36b)](_0x10bec8),VisuMZ[_0x3f2ec8(0x394)]['Parse_Notetags_Skill_JS'](_0x10bec8);}}},Scene_Boot[_0x191967(0x29e)][_0x191967(0x4da)]=function(){const _0x268610=_0x191967;for(const _0x55e390 of $dataStates){if(_0x268610(0x333)!==_0x268610(0x333)){function _0x169722(){const _0x1daf94=_0x268610,_0x1d4899=_0x29f3d3[_0x1daf94(0x320)]('['+_0x39cdc5['$1']['match'](/\d+/g)+']');for(const _0x45a2d7 of _0x1d4899){if(!_0x25555a[_0x1daf94(0x37b)](_0x45a2d7))return!![];}return![];}}else{if(!_0x55e390)continue;VisuMZ[_0x268610(0x394)][_0x268610(0x253)](_0x55e390),VisuMZ[_0x268610(0x394)][_0x268610(0x335)](_0x55e390),VisuMZ[_0x268610(0x394)]['Parse_Notetags_State_SlipEffectJS'](_0x55e390),VisuMZ[_0x268610(0x394)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x55e390);}}},VisuMZ[_0x191967(0x394)][_0x191967(0x3f0)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x191967(0x3f0)]=function(_0x3920b6){const _0x3e0802=_0x191967;VisuMZ[_0x3e0802(0x394)]['ParseSkillNotetags']['call'](this,_0x3920b6),VisuMZ[_0x3e0802(0x394)][_0x3e0802(0x36b)](_0x3920b6),VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_JS'](_0x3920b6);},VisuMZ['SkillsStatesCore']['ParseStateNotetags']=VisuMZ[_0x191967(0x1ef)],VisuMZ['ParseStateNotetags']=function(_0xaa950b){const _0x316120=_0x191967;VisuMZ[_0x316120(0x394)][_0x316120(0x1ef)][_0x316120(0x344)](this,_0xaa950b),VisuMZ[_0x316120(0x394)]['Parse_Notetags_State_Category'](_0xaa950b),VisuMZ[_0x316120(0x394)][_0x316120(0x335)](_0xaa950b),VisuMZ[_0x316120(0x394)][_0x316120(0x4d9)](_0xaa950b),VisuMZ[_0x316120(0x394)][_0x316120(0x4ad)](_0xaa950b);},VisuMZ['SkillsStatesCore'][_0x191967(0x36b)]=function(_0x38e50d){const _0x4361c3=_0x191967,_0x24c70f=_0x38e50d['note'];if(_0x24c70f['match'](/<MP COST:[ ](\d+)>/i)){if(_0x4361c3(0x2d6)!==_0x4361c3(0x3e1))_0x38e50d['mpCost']=Number(RegExp['$1']);else{function _0x36d663(){const _0x185a8c=_0x4361c3,_0x13c4f6=this[_0x185a8c(0x33a)](),_0x44b4cb=_0x10e69d[_0x185a8c(0x2ce)]((_0x497a24-0x2)*_0x13c4f6),_0x18bd5b=_0x2fe63e-0x2,_0x17f014=this['gaugeBackColor']();this[_0x185a8c(0x294)][_0x185a8c(0x384)](_0x3f89cd,_0x442594,_0x4b80d4,_0x308609,_0x17f014),this[_0x185a8c(0x294)]['gradientFillRect'](_0x41900c+0x1,_0x2416d8+0x1,_0x44b4cb,_0x18bd5b,_0x4cfc36,_0x1d7038);}}}if(_0x24c70f[_0x4361c3(0x42d)](/<TP COST:[ ](\d+)>/i)){if(_0x4361c3(0x2eb)!==_0x4361c3(0x1ff))_0x38e50d[_0x4361c3(0x4a7)]=Number(RegExp['$1']);else{function _0x39ae34(){const _0x365e95=_0x4361c3;if(!this['_actor'][_0x365e95(0x391)](_0xcf8b52))return!![];}}}},VisuMZ['SkillsStatesCore'][_0x191967(0x430)]={},VisuMZ[_0x191967(0x394)]['skillVisibleJS']={},VisuMZ[_0x191967(0x394)][_0x191967(0x4ac)]=function(_0x21d37b){const _0x2f5abc=_0x191967,_0x2bb445=_0x21d37b[_0x2f5abc(0x3d2)];if(_0x2bb445['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){if(_0x2f5abc(0x435)!==_0x2f5abc(0x435)){function _0x3131ba(){const _0x2ef71a=_0x2f5abc,_0x2c971f=_0x4c57d1[_0x2ef71a(0x320)]('['+_0x277486['$1']['match'](/\d+/g)+']');for(const _0x1d59c8 of _0x2c971f){if(!_0x13733e[_0x2ef71a(0x37b)](_0x1d59c8))return!![];}return![];}}else{const _0x16b02d=String(RegExp['$1']),_0x3b3408=_0x2f5abc(0x44b)['format'](_0x16b02d);VisuMZ['SkillsStatesCore'][_0x2f5abc(0x430)][_0x21d37b['id']]=new Function(_0x2f5abc(0x328),_0x3b3408);}}if(_0x2bb445[_0x2f5abc(0x42d)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if(_0x2f5abc(0x461)===_0x2f5abc(0x423)){function _0x5eeda7(){const _0x283845=_0x2f5abc;if(!_0x52cc0c[_0x283845(0x37b)](_0x4b97fa))return![];}}else{const _0x497728=String(RegExp['$1']),_0x3efaf7=_0x2f5abc(0x211)[_0x2f5abc(0x2f0)](_0x497728);VisuMZ[_0x2f5abc(0x394)][_0x2f5abc(0x217)][_0x21d37b['id']]=new Function(_0x2f5abc(0x328),_0x3efaf7);}}},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_Category']=function(_0x5ee3a7){const _0x1d1fa2=_0x191967;_0x5ee3a7[_0x1d1fa2(0x3d4)]=['ALL',_0x1d1fa2(0x4ca)];const _0x4037c1=_0x5ee3a7['note'],_0xb65736=_0x4037c1['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0xb65736)for(const _0x1bded8 of _0xb65736){_0x1bded8['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x5c8697=String(RegExp['$1'])[_0x1d1fa2(0x412)]()['trim']()[_0x1d1fa2(0x3ee)](',');for(const _0x79a9c8 of _0x5c8697){if(_0x1d1fa2(0x3b3)!==_0x1d1fa2(0x3b3)){function _0x1e5a57(){const _0xa0346d=_0x1d1fa2,_0x1010f5=_0x30c188(_0x338b13['$1']),_0x143613=_0xa0346d(0x44b)[_0xa0346d(0x2f0)](_0x1010f5);_0x80f4c9[_0xa0346d(0x394)]['skillEnableJS'][_0x21a15e['id']]=new _0x109073(_0xa0346d(0x328),_0x143613);}}else _0x5ee3a7['categories']['push'](_0x79a9c8[_0x1d1fa2(0x464)]());}}if(_0x4037c1[_0x1d1fa2(0x42d)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x1d10fe=RegExp['$1'][_0x1d1fa2(0x3ee)](/[\r\n]+/);for(const _0x31b7cd of _0x1d10fe){_0x5ee3a7[_0x1d1fa2(0x3d4)]['push'](_0x31b7cd[_0x1d1fa2(0x412)]()[_0x1d1fa2(0x464)]());}}_0x4037c1[_0x1d1fa2(0x42d)](/<POSITIVE STATE>/i)&&_0x5ee3a7[_0x1d1fa2(0x3d4)][_0x1d1fa2(0x437)]('POSITIVE'),_0x4037c1[_0x1d1fa2(0x42d)](/<NEGATIVE STATE>/i)&&_0x5ee3a7[_0x1d1fa2(0x3d4)]['push'](_0x1d1fa2(0x2cc));},VisuMZ[_0x191967(0x394)][_0x191967(0x2e7)]={},VisuMZ[_0x191967(0x394)][_0x191967(0x335)]=function(_0x21fb38){const _0x105572=_0x191967,_0x28b351=_0x21fb38['note'];if(_0x28b351[_0x105572(0x42d)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x69135d=String(RegExp['$1']),_0x331720=_0x105572(0x22e)['format'](_0x69135d);VisuMZ[_0x105572(0x394)][_0x105572(0x2e7)][_0x21fb38['id']]=new Function(_0x105572(0x326),_0x331720);}},VisuMZ[_0x191967(0x394)][_0x191967(0x252)]={},VisuMZ[_0x191967(0x394)][_0x191967(0x3e0)]={},VisuMZ[_0x191967(0x394)]['stateMpSlipDamageJS']={},VisuMZ[_0x191967(0x394)][_0x191967(0x388)]={},VisuMZ[_0x191967(0x394)][_0x191967(0x308)]={},VisuMZ[_0x191967(0x394)]['stateTpSlipHealJS']={},VisuMZ[_0x191967(0x394)][_0x191967(0x4d9)]=function(_0x39a1fe){const _0x16b948=_0x191967,_0x536417=_0x39a1fe['note'],_0x2302e1=_0x16b948(0x36c);if(_0x536417[_0x16b948(0x42d)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x52326b=String(RegExp['$1']),_0x53e8ed=_0x2302e1[_0x16b948(0x2f0)](_0x52326b,_0x16b948(0x41a),-0x1,_0x16b948(0x267));VisuMZ[_0x16b948(0x394)]['stateHpSlipDamageJS'][_0x39a1fe['id']]=new Function(_0x16b948(0x446),_0x53e8ed);}else{if(_0x536417['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x418c84=String(RegExp['$1']),_0x5d7a1e=_0x2302e1[_0x16b948(0x2f0)](_0x418c84,_0x16b948(0x42f),0x1,_0x16b948(0x267));VisuMZ[_0x16b948(0x394)]['stateHpSlipHealJS'][_0x39a1fe['id']]=new Function(_0x16b948(0x446),_0x5d7a1e);}}if(_0x536417[_0x16b948(0x42d)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x4054ce=String(RegExp['$1']),_0x3da980=_0x2302e1[_0x16b948(0x2f0)](_0x4054ce,_0x16b948(0x41a),-0x1,_0x16b948(0x47a));VisuMZ[_0x16b948(0x394)][_0x16b948(0x432)][_0x39a1fe['id']]=new Function(_0x16b948(0x446),_0x3da980);}else{if(_0x536417[_0x16b948(0x42d)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x31e65a=String(RegExp['$1']),_0x4272a9=_0x2302e1[_0x16b948(0x2f0)](_0x31e65a,_0x16b948(0x42f),0x1,'slipMp');VisuMZ[_0x16b948(0x394)][_0x16b948(0x388)][_0x39a1fe['id']]=new Function(_0x16b948(0x446),_0x4272a9);}}if(_0x536417[_0x16b948(0x42d)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){if(_0x16b948(0x279)!==_0x16b948(0x279)){function _0x107ea1(){const _0x41602d=_0x16b948,_0x5b86e8=_0x286452['parse']('['+_0x2943a1['$1'][_0x41602d(0x42d)](/\d+/g)+']');for(const _0x25132d of _0x5b86e8){if(_0x1187a9[_0x41602d(0x37b)](_0x25132d))return![];}return!![];}}else{const _0x58ba79=String(RegExp['$1']),_0x38a028=_0x2302e1[_0x16b948(0x2f0)](_0x58ba79,_0x16b948(0x41a),-0x1,_0x16b948(0x268));VisuMZ[_0x16b948(0x394)]['stateTpSlipDamageJS'][_0x39a1fe['id']]=new Function(_0x16b948(0x446),_0x38a028);}}else{if(_0x536417['match'](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if(_0x16b948(0x458)!==_0x16b948(0x23f)){const _0x2a53ce=String(RegExp['$1']),_0x505fff=_0x2302e1[_0x16b948(0x2f0)](_0x2a53ce,_0x16b948(0x42f),0x1,_0x16b948(0x268));VisuMZ[_0x16b948(0x394)][_0x16b948(0x4ee)][_0x39a1fe['id']]=new Function(_0x16b948(0x446),_0x505fff);}else{function _0x2c24e3(){const _0x3eb000=_0x16b948;if(!_0x231d17[_0x3eb000(0x37b)](_0x1c0a97))return![];}}}}},VisuMZ['SkillsStatesCore']['stateAddJS']={},VisuMZ[_0x191967(0x394)][_0x191967(0x365)]={},VisuMZ['SkillsStatesCore'][_0x191967(0x4b5)]={},VisuMZ[_0x191967(0x394)][_0x191967(0x4ad)]=function(_0x22d8ed){const _0x16a899=_0x191967,_0x25860e=_0x22d8ed['note'],_0x80a757=_0x16a899(0x396);if(_0x25860e[_0x16a899(0x42d)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x348ade=String(RegExp['$1']),_0x28798c=_0x80a757['format'](_0x348ade);VisuMZ[_0x16a899(0x394)][_0x16a899(0x43c)][_0x22d8ed['id']]=new Function('stateId',_0x28798c);}if(_0x25860e[_0x16a899(0x42d)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x5b23d9=String(RegExp['$1']),_0x198345=_0x80a757[_0x16a899(0x2f0)](_0x5b23d9);VisuMZ[_0x16a899(0x394)][_0x16a899(0x365)][_0x22d8ed['id']]=new Function('stateId',_0x198345);}if(_0x25860e[_0x16a899(0x42d)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0xf6cc65=String(RegExp['$1']),_0x5e8d42=_0x80a757[_0x16a899(0x2f0)](_0xf6cc65);VisuMZ['SkillsStatesCore']['stateExpireJS'][_0x22d8ed['id']]=new Function('stateId',_0x5e8d42);}},DataManager['getClassIdWithName']=function(_0x3c7f00){const _0x2959db=_0x191967;_0x3c7f00=_0x3c7f00[_0x2959db(0x412)]()[_0x2959db(0x464)](),this[_0x2959db(0x445)]=this[_0x2959db(0x445)]||{};if(this[_0x2959db(0x445)][_0x3c7f00])return this[_0x2959db(0x445)][_0x3c7f00];for(const _0x8044 of $dataClasses){if(_0x2959db(0x499)!==_0x2959db(0x3a0)){if(!_0x8044)continue;let _0x103a50=_0x8044['name'];_0x103a50=_0x103a50[_0x2959db(0x351)](/\x1I\[(\d+)\]/gi,''),_0x103a50=_0x103a50[_0x2959db(0x351)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x103a50[_0x2959db(0x412)]()[_0x2959db(0x464)]()]=_0x8044['id'];}else{function _0xca922b(){const _0x297bfa=_0x2959db;_0x3de97b[_0x297bfa(0x394)][_0x297bfa(0x4e0)][_0x297bfa(0x344)](this,_0x34509d),this[_0x297bfa(0x409)](_0x3a95ff);}}}return this[_0x2959db(0x445)][_0x3c7f00]||0x0;},DataManager[_0x191967(0x3d7)]=function(_0x1652c0){const _0x2fb123=_0x191967;this['_stypeIDs']=this[_0x2fb123(0x2f4)]||{};if(this[_0x2fb123(0x2f4)][_0x1652c0['id']])return this[_0x2fb123(0x2f4)][_0x1652c0['id']];this[_0x2fb123(0x2f4)][_0x1652c0['id']]=[_0x1652c0[_0x2fb123(0x34d)]];if(_0x1652c0[_0x2fb123(0x3d2)][_0x2fb123(0x42d)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5bd5f7=JSON['parse']('['+RegExp['$1'][_0x2fb123(0x42d)](/\d+/g)+']');this[_0x2fb123(0x2f4)][_0x1652c0['id']]=this[_0x2fb123(0x2f4)][_0x1652c0['id']][_0x2fb123(0x3aa)](_0x5bd5f7);}else{if(_0x1652c0[_0x2fb123(0x3d2)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){if(_0x2fb123(0x4dd)!==_0x2fb123(0x4dd)){function _0x1d8ec2(){const _0xc29518=_0x2fb123;return _0xf14716=_0x377b3b(_0x4c7832),this[_0xc29518(0x210)]=this[_0xc29518(0x210)]||{},_0x4c2d6f[_0xc29518(0x42d)](/#(.*)/i)?this[_0xc29518(0x210)][_0xb57e2b]=_0xc29518(0x4e5)[_0xc29518(0x2f0)](_0x3e2def(_0x1e4550['$1'])):this[_0xc29518(0x210)][_0x1d9727]=this[_0xc29518(0x3e9)](_0x4f4465(_0x427f2a)),this[_0xc29518(0x210)][_0x547170];}}else{const _0x5668df=RegExp['$1']['split'](',');for(const _0x398224 of _0x5668df){if(_0x2fb123(0x1fa)==='VajHj'){const _0x96f45a=DataManager['getStypeIdWithName'](_0x398224);if(_0x96f45a)this[_0x2fb123(0x2f4)][_0x1652c0['id']][_0x2fb123(0x437)](_0x96f45a);}else{function _0x479a97(){const _0x2bd53d=_0x2fb123;return _0x1b6e0c['SkillsStatesCore'][_0x2bd53d(0x276)][_0x2bd53d(0x23a)]['CmdTextAlign'];}}}}}}return this[_0x2fb123(0x2f4)][_0x1652c0['id']];},DataManager['getStypeIdWithName']=function(_0x5eef95){const _0x4b1439=_0x191967;_0x5eef95=_0x5eef95[_0x4b1439(0x412)]()[_0x4b1439(0x464)](),this[_0x4b1439(0x2f4)]=this[_0x4b1439(0x2f4)]||{};if(this['_stypeIDs'][_0x5eef95])return this[_0x4b1439(0x2f4)][_0x5eef95];for(let _0x1fe0f5=0x1;_0x1fe0f5<0x64;_0x1fe0f5++){if(!$dataSystem[_0x4b1439(0x33b)][_0x1fe0f5])continue;let _0x1cba0d=$dataSystem['skillTypes'][_0x1fe0f5][_0x4b1439(0x412)]()[_0x4b1439(0x464)]();_0x1cba0d=_0x1cba0d[_0x4b1439(0x351)](/\x1I\[(\d+)\]/gi,''),_0x1cba0d=_0x1cba0d[_0x4b1439(0x351)](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x1cba0d]=_0x1fe0f5;}return this[_0x4b1439(0x2f4)][_0x5eef95]||0x0;},DataManager[_0x191967(0x3ec)]=function(_0x4f2430){const _0x14fc6b=_0x191967;_0x4f2430=_0x4f2430[_0x14fc6b(0x412)]()[_0x14fc6b(0x464)](),this[_0x14fc6b(0x287)]=this[_0x14fc6b(0x287)]||{};if(this[_0x14fc6b(0x287)][_0x4f2430])return this['_skillIDs'][_0x4f2430];for(const _0x2bddd4 of $dataSkills){if(!_0x2bddd4)continue;this[_0x14fc6b(0x287)][_0x2bddd4[_0x14fc6b(0x213)][_0x14fc6b(0x412)]()['trim']()]=_0x2bddd4['id'];}return this[_0x14fc6b(0x287)][_0x4f2430]||0x0;},DataManager[_0x191967(0x38b)]=function(_0x1fedfb){const _0x4f2c4f=_0x191967;_0x1fedfb=_0x1fedfb[_0x4f2c4f(0x412)]()[_0x4f2c4f(0x464)](),this['_stateIDs']=this[_0x4f2c4f(0x44a)]||{};if(this[_0x4f2c4f(0x44a)][_0x1fedfb])return this[_0x4f2c4f(0x44a)][_0x1fedfb];for(const _0x1042dd of $dataStates){if(!_0x1042dd)continue;this['_stateIDs'][_0x1042dd[_0x4f2c4f(0x213)][_0x4f2c4f(0x412)]()[_0x4f2c4f(0x464)]()]=_0x1042dd['id'];}return this[_0x4f2c4f(0x44a)][_0x1fedfb]||0x0;},DataManager[_0x191967(0x454)]=function(_0x3f3e3c){const _0x1e8fb3=_0x191967;this[_0x1e8fb3(0x207)]=this[_0x1e8fb3(0x207)]||{};if(this[_0x1e8fb3(0x207)][_0x3f3e3c])return this['_stateMaxTurns'][_0x3f3e3c];if($dataStates[_0x3f3e3c][_0x1e8fb3(0x3d2)][_0x1e8fb3(0x42d)](/<MAX TURNS:[ ](\d+)>/i))this['_stateMaxTurns'][_0x3f3e3c]=Number(RegExp['$1']);else{if(_0x1e8fb3(0x463)===_0x1e8fb3(0x46d)){function _0x3d70ad(){const _0x125ed1=_0x1e8fb3;_0x45cb1f['SkillsStatesCore']['Settings'][_0x125ed1(0x317)]['onExpireBuffJS'][_0x125ed1(0x344)](this,_0x4adaa3);}}else this['_stateMaxTurns'][_0x3f3e3c]=VisuMZ['SkillsStatesCore']['Settings'][_0x1e8fb3(0x273)][_0x1e8fb3(0x41b)];}return this[_0x1e8fb3(0x207)][_0x3f3e3c];},ColorManager[_0x191967(0x26c)]=function(_0x4b9f9a,_0x57911c){const _0xb0383c=_0x191967;_0x57911c=String(_0x57911c),this[_0xb0383c(0x210)]=this['_colorCache']||{};if(_0x57911c[_0xb0383c(0x42d)](/#(.*)/i))this[_0xb0383c(0x210)][_0x4b9f9a]=_0xb0383c(0x4e5)[_0xb0383c(0x2f0)](String(RegExp['$1']));else{if(_0xb0383c(0x2c8)!==_0xb0383c(0x2c8)){function _0x18d152(){const _0x52c6de=_0xb0383c;if(_0x175d49['states']()[_0x52c6de(0x2a7)]<=0x0)return;const _0x20e6bc=this[_0x52c6de(0x2db)]()[_0x52c6de(0x3d2)];if(_0x20e6bc[_0x52c6de(0x42d)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){const _0xb8dbec=_0x37fee8(_0x35aae7['$1']);_0x117d14['removeStatesByCategoryAll'](_0xb8dbec);}const _0x43a71b=_0x20e6bc['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x43a71b)for(const _0x174077 of _0x43a71b){_0x174077['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x5a8595=_0x5401f7(_0x5709ae['$1']),_0x26f38f=_0x2d83b1(_0x4cca58['$2']);_0x487f32[_0x52c6de(0x44f)](_0x5a8595,_0x26f38f);}}}else this['_colorCache'][_0x4b9f9a]=this[_0xb0383c(0x3e9)](Number(_0x57911c));}return this[_0xb0383c(0x210)][_0x4b9f9a];},ColorManager[_0x191967(0x28e)]=function(_0x5ab956){const _0x4d358a=_0x191967;_0x5ab956=String(_0x5ab956);if(_0x5ab956[_0x4d358a(0x42d)](/#(.*)/i)){if(_0x4d358a(0x489)===_0x4d358a(0x2d5)){function _0x1e53ea(){const _0x14b269=_0x4d358a;_0x36aa1f[_0x257142][_0xf8a468][_0x14b269(0x344)](this,_0x529b6d);}}else return _0x4d358a(0x4e5)[_0x4d358a(0x2f0)](String(RegExp['$1']));}else return this[_0x4d358a(0x3e9)](Number(_0x5ab956));},ColorManager[_0x191967(0x30f)]=function(_0x389cfa){const _0x19ebc2=_0x191967;if(typeof _0x389cfa===_0x19ebc2(0x319))_0x389cfa=$dataStates[_0x389cfa];const _0x3b94e8=_0x19ebc2(0x46c)[_0x19ebc2(0x2f0)](_0x389cfa['id']);this[_0x19ebc2(0x210)]=this[_0x19ebc2(0x210)]||{};if(this[_0x19ebc2(0x210)][_0x3b94e8])return this[_0x19ebc2(0x210)][_0x3b94e8];const _0x541423=this[_0x19ebc2(0x472)](_0x389cfa);return this[_0x19ebc2(0x26c)](_0x3b94e8,_0x541423);},ColorManager['retrieveStateColor']=function(_0x3ad862){const _0x5ede4c=_0x191967,_0x1f7559=_0x3ad862[_0x5ede4c(0x3d2)];if(_0x1f7559[_0x5ede4c(0x42d)](/<TURN COLOR:[ ](.*)>/i)){if(_0x5ede4c(0x305)==='MsXLh')return String(RegExp['$1']);else{function _0x3c4f38(){const _0x4d2080=_0x5ede4c;_0x4fbc70[_0x4d2080(0x2fd)](_0x91ba19,_0x4913f1),this[_0x4d2080(0x443)](_0x2c991b);}}}else{if(_0x1f7559[_0x5ede4c(0x42d)](/<POSITIVE STATE>/i))return VisuMZ[_0x5ede4c(0x394)][_0x5ede4c(0x276)][_0x5ede4c(0x273)][_0x5ede4c(0x362)];else return _0x1f7559[_0x5ede4c(0x42d)](/<NEGATIVE STATE>/i)?VisuMZ[_0x5ede4c(0x394)][_0x5ede4c(0x276)]['States'][_0x5ede4c(0x331)]:VisuMZ[_0x5ede4c(0x394)]['Settings'][_0x5ede4c(0x273)]['ColorNeutral'];}},ColorManager[_0x191967(0x263)]=function(){const _0x183952=_0x191967,_0x33ea5b=_0x183952(0x48b);this['_colorCache']=this[_0x183952(0x210)]||{};if(this[_0x183952(0x210)][_0x33ea5b])return this[_0x183952(0x210)][_0x33ea5b];const _0x26d445=VisuMZ[_0x183952(0x394)]['Settings'][_0x183952(0x317)][_0x183952(0x20b)];return this[_0x183952(0x26c)](_0x33ea5b,_0x26d445);},ColorManager[_0x191967(0x3e5)]=function(){const _0x4d8c72=_0x191967,_0x26758d=_0x4d8c72(0x4cb);this['_colorCache']=this['_colorCache']||{};if(this[_0x4d8c72(0x210)][_0x26758d])return this[_0x4d8c72(0x210)][_0x26758d];const _0x7140e=VisuMZ['SkillsStatesCore'][_0x4d8c72(0x276)][_0x4d8c72(0x317)]['ColorDebuff'];return this[_0x4d8c72(0x26c)](_0x26758d,_0x7140e);},VisuMZ['SkillsStatesCore'][_0x191967(0x28a)]=BattleManager['endAction'],BattleManager[_0x191967(0x3ed)]=function(){const _0x1b9688=_0x191967;this[_0x1b9688(0x283)](),VisuMZ['SkillsStatesCore'][_0x1b9688(0x28a)][_0x1b9688(0x344)](this);},BattleManager[_0x191967(0x283)]=function(){const _0x20e9a8=_0x191967,_0x632fa1=VisuMZ['SkillsStatesCore'][_0x20e9a8(0x276)]['States'];if(!_0x632fa1)return;if(_0x632fa1[_0x20e9a8(0x405)]===![])return;if(!this['_subject'])return;this[_0x20e9a8(0x485)][_0x20e9a8(0x283)]();},Game_Battler[_0x191967(0x29e)][_0x191967(0x283)]=function(){const _0xb043fe=_0x191967;for(const _0xec3510 of this['_states']){if(_0xb043fe(0x476)!==_0xb043fe(0x476)){function _0x1a902c(){const _0x5a49c9=_0xb043fe;return _0x3134b9[_0x5a49c9(0x3d7)](_0x1be3e1)['includes'](this['_stypeId']);}}else{const _0x25e511=$dataStates[_0xec3510];if(!_0x25e511)continue;if(_0x25e511[_0xb043fe(0x4e9)]!==0x1)continue;if(this[_0xb043fe(0x346)][_0xec3510]>0x0){if(_0xb043fe(0x2e8)!=='DACgi')this[_0xb043fe(0x346)][_0xec3510]--;else{function _0x246621(){const _0x640267=_0xb043fe,_0xa2c3c5=_0x2b0944(_0x244c25['$1']),_0x5711a0=_0x38dc73[_0x640267(0x2f0)](_0xa2c3c5,_0x640267(0x42f),0x1,_0x640267(0x47a));_0x2d156a[_0x640267(0x394)][_0x640267(0x388)][_0x2581de['id']]=new _0x877522(_0x640267(0x446),_0x5711a0);}}}}}this[_0xb043fe(0x21d)](0x1);},Game_BattlerBase[_0x191967(0x29e)]['updateStateTurns']=function(){const _0x80b9e5=_0x191967,_0xb57252=VisuMZ[_0x80b9e5(0x394)][_0x80b9e5(0x276)][_0x80b9e5(0x273)];for(const _0x58423c of this[_0x80b9e5(0x2e2)]){const _0x1f097e=$dataStates[_0x58423c];if(_0xb57252&&_0xb57252[_0x80b9e5(0x405)]!==![]){if('FkmEp'==='GtwLp'){function _0x5272fe(){const _0x28f58a=_0x80b9e5,_0xb98306=_0x4182a1['note'];return _0xb98306[_0x28f58a(0x42d)](/<REAPPLY RULES:[ ](.*)>/i)?_0x54f731(_0x4d5de9['$1']):_0xbdc988[_0x28f58a(0x394)][_0x28f58a(0x276)]['States'][_0x28f58a(0x492)];}}else{if(_0x1f097e&&_0x1f097e[_0x80b9e5(0x4e9)]===0x1)continue;}}if(this[_0x80b9e5(0x346)][_0x58423c]>0x0){if(_0x80b9e5(0x3c0)!==_0x80b9e5(0x3c0)){function _0x43be82(){const _0xea8aeb=_0x80b9e5,_0x5ed30d=_0x3c7c4d['parse']('['+_0x1738a0['$1'][_0xea8aeb(0x42d)](/\d+/g)+']');for(const _0x56a29b of _0x5ed30d){if(!_0x4d2cf7[_0xea8aeb(0x37b)](_0x56a29b))return!![];}return![];}}else this[_0x80b9e5(0x346)][_0x58423c]--;}}},VisuMZ[_0x191967(0x394)][_0x191967(0x471)]=Game_Action[_0x191967(0x29e)][_0x191967(0x295)],Game_Action[_0x191967(0x29e)]['applyItemUserEffect']=function(_0x45beac){const _0x31c9db=_0x191967;VisuMZ['SkillsStatesCore']['Game_Action_applyItemUserEffect'][_0x31c9db(0x344)](this,_0x45beac),this[_0x31c9db(0x39a)](_0x45beac);},Game_Action['prototype']['applySkillsStatesCoreEffects']=function(_0xf403ff){const _0x2596a0=_0x191967;this['applyStateCategoryRemovalEffects'](_0xf403ff),this[_0x2596a0(0x27d)](_0xf403ff),this[_0x2596a0(0x3e8)](_0xf403ff),this['applyDebuffTurnManipulationEffects'](_0xf403ff);},VisuMZ['SkillsStatesCore'][_0x191967(0x3e6)]=Game_Action['prototype'][_0x191967(0x1f9)],Game_Action['prototype']['testApply']=function(_0x4b6b73){const _0x1bc494=_0x191967;if(this[_0x1bc494(0x3c7)](_0x4b6b73)){if('ZLnxx'!==_0x1bc494(0x479)){function _0xa71bd3(){const _0x39f895=_0x1bc494;if(!this[_0x39f895(0x37c)][_0x39f895(0x214)](_0x37d23c))return!![];}}else return!![];}return VisuMZ[_0x1bc494(0x394)]['Game_Action_testApply'][_0x1bc494(0x344)](this,_0x4b6b73);},Game_Action[_0x191967(0x29e)][_0x191967(0x3c7)]=function(_0x36ec65){const _0x783f74=_0x191967,_0x192416=this[_0x783f74(0x2db)]()[_0x783f74(0x3d2)];if(_0x192416[_0x783f74(0x42d)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){if(_0x783f74(0x3f2)===_0x783f74(0x3f2)){const _0x52bed9=String(RegExp['$1']);if(_0x36ec65[_0x783f74(0x4ba)](_0x52bed9))return!![];}else{function _0x123c22(){const _0x3b46f9=_0x783f74;_0x2a3386[_0x3b46f9(0x394)]['Game_Action_applyItemUserEffect'][_0x3b46f9(0x344)](this,_0x2b60ce),this['applySkillsStatesCoreEffects'](_0x58d52c);}}}if(_0x192416[_0x783f74(0x42d)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){if(_0x783f74(0x332)===_0x783f74(0x40d)){function _0x2cec5d(){this['onAddBuffGlobalJS'](_0x5856d6,_0x3da4e8);}}else{const _0x1c8806=Number(RegExp['$1']);if(_0x36ec65[_0x783f74(0x23c)](_0x1c8806))return!![];}}else{if(_0x192416[_0x783f74(0x42d)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x333828=DataManager[_0x783f74(0x38b)](RegExp['$1']);if(_0x36ec65[_0x783f74(0x23c)](_0x333828))return!![];}}return![];},Game_Action['prototype']['applyStateCategoryRemovalEffects']=function(_0x404c02){const _0x12ad00=_0x191967;if(_0x404c02[_0x12ad00(0x451)]()[_0x12ad00(0x2a7)]<=0x0)return;const _0x1d7193=this[_0x12ad00(0x2db)]()[_0x12ad00(0x3d2)];if(_0x1d7193[_0x12ad00(0x42d)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){if(_0x12ad00(0x408)!==_0x12ad00(0x45c)){const _0x33589e=String(RegExp['$1']);_0x404c02['removeStatesByCategoryAll'](_0x33589e);}else{function _0xf42f9b(){const _0x1df2fd=_0x12ad00;return this[_0x1df2fd(0x27e)]();}}}const _0x2f59ce=_0x1d7193['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x2f59ce)for(const _0x4e14ba of _0x2f59ce){if(_0x12ad00(0x456)!=='UFQzA'){function _0x40e81b(){const _0x21354e=_0x12ad00;_0x4baf0b[_0x21354e(0x29e)]['addPassiveStatesByPluginParameters'][_0x21354e(0x344)](this);const _0x581c3e=_0x3439f1[_0x21354e(0x394)][_0x21354e(0x276)][_0x21354e(0x41e)][_0x21354e(0x2bb)];this[_0x21354e(0x483)][_0x21354e(0x406)]=this[_0x21354e(0x483)][_0x21354e(0x406)]['concat'](_0x581c3e);}}else{_0x4e14ba[_0x12ad00(0x42d)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x48273a=String(RegExp['$1']),_0x987d7e=Number(RegExp['$2']);_0x404c02[_0x12ad00(0x44f)](_0x48273a,_0x987d7e);}}},Game_Action['prototype'][_0x191967(0x27d)]=function(_0x5054d2){const _0x4845c9=_0x191967,_0x5bac62=this[_0x4845c9(0x2db)]()[_0x4845c9(0x3d2)],_0x1f83f3=_0x5bac62[_0x4845c9(0x42d)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x1f83f3){if('QbmQy'==='QbmQy')for(const _0x1abe8b of _0x1f83f3){let _0x5f1f02=0x0,_0x2a95de=0x0;if(_0x1abe8b[_0x4845c9(0x42d)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)){if(_0x4845c9(0x453)===_0x4845c9(0x3be)){function _0x4a0177(){const _0x4de171=_0x4845c9;if(this[_0x4de171(0x293)]())return this[_0x4de171(0x2ca)]();else{const _0x326de0=_0x486906['SkillsStatesCore'][_0x4de171(0x2a9)][_0x4de171(0x344)](this);return this['allowCreateShopStatusWindow']()&&this['adjustItemWidthByShopStatus']()&&(_0x326de0['width']-=this['shopStatusWidth']()),_0x326de0;}}}else _0x5f1f02=Number(RegExp['$1']),_0x2a95de=Number(RegExp['$2']);}else{if(_0x1abe8b[_0x4845c9(0x42d)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)){if(_0x4845c9(0x238)!==_0x4845c9(0x238)){function _0x196f80(){const _0x4dbf88=_0x4845c9;_0x5733a8[_0x1a6b68][_0x21d477]&&_0x138cb8[_0x6dc5aa][_0x1ebf30][_0x4dbf88(0x344)](this,_0x42b076);}}else _0x5f1f02=DataManager[_0x4845c9(0x38b)](RegExp['$1']),_0x2a95de=Number(RegExp['$2']);}}_0x5054d2[_0x4845c9(0x2ff)](_0x5f1f02,_0x2a95de),this[_0x4845c9(0x443)](_0x5054d2);}else{function _0x91d35(){const _0x408260=_0x4845c9;return _0x83613f[_0x408260(0x212)];}}}const _0xd3fe91=_0x5bac62[_0x4845c9(0x42d)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0xd3fe91)for(const _0x3a8c13 of _0xd3fe91){let _0x121eb5=0x0,_0x5d9083=0x0;if(_0x3a8c13[_0x4845c9(0x42d)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x121eb5=Number(RegExp['$1']),_0x5d9083=Number(RegExp['$2']);else _0x3a8c13[_0x4845c9(0x42d)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x121eb5=DataManager[_0x4845c9(0x38b)](RegExp['$1']),_0x5d9083=Number(RegExp['$2']));_0x5054d2['addStateTurns'](_0x121eb5,_0x5d9083),this[_0x4845c9(0x443)](_0x5054d2);}},Game_Action[_0x191967(0x29e)][_0x191967(0x3e8)]=function(_0x5c5193){const _0x176459=_0x191967,_0x2716d5=[_0x176459(0x2a8),_0x176459(0x355),_0x176459(0x2c0),_0x176459(0x20a),'MAT',_0x176459(0x321),_0x176459(0x22a),_0x176459(0x25d)],_0x286c79=this[_0x176459(0x2db)]()[_0x176459(0x3d2)],_0x5947e3=_0x286c79[_0x176459(0x42d)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x5947e3){if(_0x176459(0x2ed)!==_0x176459(0x3df))for(const _0x3fbea4 of _0x5947e3){_0x3fbea4[_0x176459(0x42d)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x12f760=_0x2716d5[_0x176459(0x300)](String(RegExp['$1'])[_0x176459(0x412)]()),_0x50401b=Number(RegExp['$2']);_0x12f760>=0x0&&(_0x5c5193[_0x176459(0x4e1)](_0x12f760,_0x50401b),this['makeSuccess'](_0x5c5193));}else{function _0x49469e(){const _0x52b17f=_0x176459;_0x2e1fd5[_0x52b17f(0x29e)][_0x52b17f(0x4c7)][_0x52b17f(0x344)](this,_0xd65f6d);}}}const _0x1d3ced=_0x286c79[_0x176459(0x42d)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1d3ced)for(const _0x36c2a2 of _0x5947e3){_0x36c2a2[_0x176459(0x42d)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x45534e=_0x2716d5[_0x176459(0x300)](String(RegExp['$1'])[_0x176459(0x412)]()),_0x40c3d0=Number(RegExp['$2']);_0x45534e>=0x0&&(_0x5c5193['addBuffTurns'](_0x45534e,_0x40c3d0),this[_0x176459(0x443)](_0x5c5193));}},Game_Action[_0x191967(0x29e)][_0x191967(0x436)]=function(_0x44cc8f){const _0x3524ce=_0x191967,_0x28277a=[_0x3524ce(0x2a8),_0x3524ce(0x355),_0x3524ce(0x2c0),_0x3524ce(0x20a),_0x3524ce(0x467),'MDF',_0x3524ce(0x22a),'LUK'],_0x222e58=this[_0x3524ce(0x2db)]()['note'],_0x3e4df4=_0x222e58[_0x3524ce(0x42d)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x3e4df4)for(const _0x38adbb of _0x3e4df4){_0x38adbb[_0x3524ce(0x42d)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x296ea0=_0x28277a[_0x3524ce(0x300)](String(RegExp['$1'])[_0x3524ce(0x412)]()),_0x4da421=Number(RegExp['$2']);_0x296ea0>=0x0&&(_0x44cc8f[_0x3524ce(0x4a5)](_0x296ea0,_0x4da421),this[_0x3524ce(0x443)](_0x44cc8f));}const _0x526900=_0x222e58[_0x3524ce(0x42d)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x526900)for(const _0x2e7037 of _0x3e4df4){_0x2e7037[_0x3524ce(0x42d)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x54be62=_0x28277a['indexOf'](String(RegExp['$1'])[_0x3524ce(0x412)]()),_0x36f6d9=Number(RegExp['$2']);if(_0x54be62>=0x0){if('AJAQS'!==_0x3524ce(0x40c)){function _0x142ea4(){const _0x198420=_0x3524ce;this[_0x198420(0x3ea)](_0x4f2039,_0x339d4a);}}else _0x44cc8f[_0x3524ce(0x2fd)](_0x54be62,_0x36f6d9),this[_0x3524ce(0x443)](_0x44cc8f);}}},VisuMZ[_0x191967(0x394)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x191967(0x29e)]['initMembers'],Game_BattlerBase[_0x191967(0x29e)]['initMembers']=function(){const _0x49178c=_0x191967;this[_0x49178c(0x483)]={},this[_0x49178c(0x4e7)](),VisuMZ[_0x49178c(0x394)][_0x49178c(0x2b9)][_0x49178c(0x344)](this);},Game_BattlerBase['prototype'][_0x191967(0x4e7)]=function(){const _0xec4947=_0x191967;this[_0xec4947(0x20e)]='',this[_0xec4947(0x33d)]={},this[_0xec4947(0x323)]={},this['_stateOrigin']={};},Game_BattlerBase[_0x191967(0x29e)]['checkCacheKey']=function(_0x47eb79){const _0x250bda=_0x191967;return this[_0x250bda(0x483)]=this[_0x250bda(0x483)]||{},this[_0x250bda(0x483)][_0x47eb79]!==undefined;},VisuMZ[_0x191967(0x394)]['Game_BattlerBase_refresh']=Game_BattlerBase['prototype']['refresh'],Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x3bc)]=function(){const _0xc1586a=_0x191967;this[_0xc1586a(0x483)]={},VisuMZ[_0xc1586a(0x394)][_0xc1586a(0x366)][_0xc1586a(0x344)](this);},VisuMZ['SkillsStatesCore'][_0x191967(0x4c6)]=Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x448)],Game_BattlerBase[_0x191967(0x29e)]['eraseState']=function(_0x17c5ed){const _0x480fde=_0x191967;let _0x4465b8=this[_0x480fde(0x23c)](_0x17c5ed);VisuMZ[_0x480fde(0x394)][_0x480fde(0x4c6)]['call'](this,_0x17c5ed);if(_0x4465b8&&!this['isStateAffected'](_0x17c5ed))this[_0x480fde(0x3d5)](_0x17c5ed);},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x3d5)]=function(_0x37ee48){const _0x34cf98=_0x191967;this[_0x34cf98(0x47d)](_0x37ee48),this[_0x34cf98(0x3ad)](_0x37ee48),this[_0x34cf98(0x4e4)](_0x37ee48);},VisuMZ[_0x191967(0x394)][_0x191967(0x4a0)]=Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x3b0)],Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x3b0)]=function(_0x4af173){const _0x439175=_0x191967,_0x1df308=$dataStates[_0x4af173],_0x37f135=this[_0x439175(0x3c1)](_0x4af173),_0x4b40be=this[_0x439175(0x379)](_0x1df308)['toLowerCase']()[_0x439175(0x464)]();switch(_0x4b40be){case _0x439175(0x39b):if(_0x37f135<=0x0)VisuMZ[_0x439175(0x394)][_0x439175(0x4a0)]['call'](this,_0x4af173);break;case _0x439175(0x368):VisuMZ[_0x439175(0x394)][_0x439175(0x4a0)][_0x439175(0x344)](this,_0x4af173);break;case _0x439175(0x3dd):VisuMZ[_0x439175(0x394)][_0x439175(0x4a0)][_0x439175(0x344)](this,_0x4af173),this[_0x439175(0x346)][_0x4af173]=Math[_0x439175(0x313)](this['_stateTurns'][_0x4af173],_0x37f135);break;case _0x439175(0x2b7):VisuMZ['SkillsStatesCore'][_0x439175(0x4a0)][_0x439175(0x344)](this,_0x4af173),this['_stateTurns'][_0x4af173]+=_0x37f135;break;default:VisuMZ['SkillsStatesCore'][_0x439175(0x4a0)][_0x439175(0x344)](this,_0x4af173);break;}},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x379)]=function(_0x1a0943){const _0x46a0cd=_0x191967,_0x565948=_0x1a0943['note'];return _0x565948[_0x46a0cd(0x42d)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x46a0cd(0x394)][_0x46a0cd(0x276)][_0x46a0cd(0x273)][_0x46a0cd(0x492)];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x387)],Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x387)]=function(_0x59c9ab,_0x155c2c){const _0x168d33=_0x191967,_0x33d986=VisuMZ[_0x168d33(0x394)][_0x168d33(0x276)]['Buffs'][_0x168d33(0x492)],_0x3a3e7c=this[_0x168d33(0x2dd)](_0x59c9ab);switch(_0x33d986){case'ignore':if(_0x3a3e7c<=0x0)this['_buffTurns'][_0x59c9ab]=_0x155c2c;break;case'reset':this[_0x168d33(0x4cc)][_0x59c9ab]=_0x155c2c;break;case _0x168d33(0x3dd):this[_0x168d33(0x4cc)][_0x59c9ab]=Math['max'](_0x3a3e7c,_0x155c2c);break;case _0x168d33(0x2b7):this['_buffTurns'][_0x59c9ab]+=_0x155c2c;break;default:VisuMZ[_0x168d33(0x394)][_0x168d33(0x3c2)][_0x168d33(0x344)](this,_0x59c9ab,_0x155c2c);break;}const _0x5917c1=VisuMZ[_0x168d33(0x394)][_0x168d33(0x276)][_0x168d33(0x317)][_0x168d33(0x41b)];this[_0x168d33(0x4cc)][_0x59c9ab]=this['_buffTurns'][_0x59c9ab][_0x168d33(0x3a7)](0x0,_0x5917c1);},Game_BattlerBase[_0x191967(0x29e)]['isGroupDefeatStateAffected']=function(){const _0x3435a1=_0x191967;if(this[_0x3435a1(0x483)]['groupDefeat']!==undefined)return this[_0x3435a1(0x483)][_0x3435a1(0x251)];this['_cache'][_0x3435a1(0x251)]=![];const _0x3908cd=this[_0x3435a1(0x451)]();for(const _0x3015ed of _0x3908cd){if(!_0x3015ed)continue;if(_0x3015ed[_0x3435a1(0x3d2)]['match'](/<GROUP DEFEAT>/i)){this['_cache'][_0x3435a1(0x251)]=!![];break;}}return this[_0x3435a1(0x483)]['groupDefeat'];},VisuMZ[_0x191967(0x394)][_0x191967(0x2b8)]=Game_BattlerBase[_0x191967(0x29e)]['clearStates'],Game_BattlerBase['prototype'][_0x191967(0x292)]=function(){const _0x23a648=_0x191967;if(this['getStateRetainType']()!=='')this[_0x23a648(0x271)]();else{if('QXuuX'===_0x23a648(0x1fc))VisuMZ['SkillsStatesCore'][_0x23a648(0x2b8)][_0x23a648(0x344)](this),this[_0x23a648(0x4e7)]();else{function _0x50c902(){const _0x4f8f82=_0x23a648,_0x33e0c7=this[_0x4f8f82(0x37c)]!==_0x19f25a;_0x4e3bf5['SkillsStatesCore'][_0x4f8f82(0x261)][_0x4f8f82(0x344)](this,_0x5c27cd),_0x33e0c7&&(this[_0x4f8f82(0x3de)]&&this[_0x4f8f82(0x3de)][_0x4f8f82(0x4ed)]===_0x5afeff&&this[_0x4f8f82(0x3de)][_0x4f8f82(0x21c)](this[_0x4f8f82(0x302)](0x0)));}}}},Game_Actor[_0x191967(0x29e)][_0x191967(0x292)]=function(){const _0x41ba4b=_0x191967;this[_0x41ba4b(0x41d)]=this[_0x41ba4b(0x41d)]||{},Game_Battler[_0x41ba4b(0x29e)][_0x41ba4b(0x292)][_0x41ba4b(0x344)](this);},Game_BattlerBase['prototype'][_0x191967(0x271)]=function(){const _0x3e9df3=_0x191967,_0x25efe2=this[_0x3e9df3(0x451)]();for(const _0x174820 of _0x25efe2){if(_0x3e9df3(0x255)===_0x3e9df3(0x403)){function _0x34bc9b(){const _0x519a1e=_0x3e9df3,_0x6847c7=_0x53fb83['note'];if(_0x6847c7['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x631c8a=_0x3f557e(_0x1a38e4['$1'])[_0x519a1e(0x3ee)](',')[_0x519a1e(0x2ea)](_0x3b0fb0=>_0x3b0fb0[_0x519a1e(0x464)]()),_0xe04138=_0x2d9e17[_0x519a1e(0x394)]['ParseClassIDs'](_0x631c8a);return _0xe04138['includes'](this['currentClass']());}if(_0x6847c7[_0x519a1e(0x42d)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x15133d=_0x411e66(_0x1c7952['$1'])['split'](',')['map'](_0x3407ff=>_0x3407ff[_0x519a1e(0x464)]()),_0x589fd6=_0x13ff85['SkillsStatesCore'][_0x519a1e(0x30e)](_0x15133d);let _0xbcdd08=[this['currentClass']()];return _0x3d256b[_0x519a1e(0x282)]&&this[_0x519a1e(0x1f1)]&&(_0xbcdd08=this[_0x519a1e(0x1f1)]()),_0x589fd6[_0x519a1e(0x3b2)](_0x4a4abe=>_0xbcdd08[_0x519a1e(0x398)](_0x4a4abe))[_0x519a1e(0x2a7)]>0x0;}return _0x34c6ac[_0x519a1e(0x29e)][_0x519a1e(0x4d0)]['call'](this,_0x170294);}}else{if(_0x174820&&this[_0x3e9df3(0x2f3)](_0x174820))this[_0x3e9df3(0x448)](_0x174820['id']);}}this[_0x3e9df3(0x483)]={};},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x2f3)]=function(_0x2be692){const _0x55ce01=_0x191967,_0x20f988=this['getStateRetainType']();if(_0x20f988!==''){if('uirKT'==='pCBlr'){function _0x19386f(){const _0x1c2db8=_0x3a6a,_0x4c914a=_0x4284ea[_0x1c2db8(0x320)]('['+_0x1f2033['$1'][_0x1c2db8(0x42d)](/\d+/g)+']');for(const _0x4d3c3c of _0x4c914a){if(_0x330946[_0x1c2db8(0x37b)](_0x4d3c3c))return!![];}return![];}}else{const _0x3c095e=_0x2be692[_0x55ce01(0x3d2)];if(_0x20f988==='death'&&_0x3c095e[_0x55ce01(0x42d)](/<NO DEATH CLEAR>/i))return![];if(_0x20f988===_0x55ce01(0x477)&&_0x3c095e['match'](/<NO RECOVER ALL CLEAR>/i))return![];}}return this[_0x55ce01(0x23c)](_0x2be692['id']);},Game_BattlerBase[_0x191967(0x29e)]['getStateRetainType']=function(){const _0x434455=_0x191967;return this[_0x434455(0x20e)];},Game_BattlerBase['prototype'][_0x191967(0x3f5)]=function(_0x30536e){this['_stateRetainType']=_0x30536e;},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x37d)]=function(){this['_stateRetainType']='';},VisuMZ[_0x191967(0x394)][_0x191967(0x3cc)]=Game_BattlerBase[_0x191967(0x29e)]['die'],Game_BattlerBase['prototype'][_0x191967(0x46f)]=function(){const _0x28cff8=_0x191967;this[_0x28cff8(0x3f5)](_0x28cff8(0x4c5)),VisuMZ[_0x28cff8(0x394)][_0x28cff8(0x3cc)][_0x28cff8(0x344)](this),this[_0x28cff8(0x37d)]();},VisuMZ[_0x191967(0x394)][_0x191967(0x3bd)]=Game_BattlerBase['prototype']['recoverAll'],Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x3ae)]=function(){const _0x35d092=_0x191967;this[_0x35d092(0x3f5)](_0x35d092(0x477)),VisuMZ[_0x35d092(0x394)][_0x35d092(0x3bd)][_0x35d092(0x344)](this),this[_0x35d092(0x37d)]();},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x247)]=function(_0x1ae6b4){const _0x1f5092=_0x191967;for(settings of VisuMZ[_0x1f5092(0x394)][_0x1f5092(0x276)][_0x1f5092(0x480)]){if(_0x1f5092(0x3f4)!==_0x1f5092(0x44c)){const _0x2b803e=settings[_0x1f5092(0x35b)][_0x1f5092(0x344)](this,_0x1ae6b4);if(!settings[_0x1f5092(0x491)][_0x1f5092(0x344)](this,_0x1ae6b4,_0x2b803e))return![];}else{function _0x590b99(){const _0x909275=_0x1f5092;_0x58eaa9[_0x909275(0x4e1)](_0x393cbf,_0x3aafd9),this[_0x909275(0x443)](_0x22802e);}}}return!![];},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x28c)]=function(_0x45d50a){const _0x1524a9=_0x191967;for(settings of VisuMZ[_0x1524a9(0x394)]['Settings']['Costs']){const _0x53eae2=settings['CalcJS'][_0x1524a9(0x344)](this,_0x45d50a);settings[_0x1524a9(0x318)][_0x1524a9(0x344)](this,_0x45d50a,_0x53eae2);}},VisuMZ[_0x191967(0x394)]['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x191967(0x29e)]['meetsSkillConditions'],Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x3c3)]=function(_0x2eb294){const _0x5024d3=_0x191967;if(!_0x2eb294)return![];if(!VisuMZ['SkillsStatesCore'][_0x5024d3(0x28b)][_0x5024d3(0x344)](this,_0x2eb294))return![];if(!this['checkSkillConditionsNotetags'](_0x2eb294))return![];if(!this[_0x5024d3(0x345)](_0x2eb294))return![];if(!this[_0x5024d3(0x4b2)](_0x2eb294))return![];return!![];},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x3eb)]=function(_0x3c9c14){const _0x28ad1e=_0x191967;if(!this[_0x28ad1e(0x3f6)](_0x3c9c14))return![];return!![];},Game_BattlerBase['prototype'][_0x191967(0x3f6)]=function(_0x45ff35){const _0x3d9759=_0x191967,_0x5117ae=_0x45ff35[_0x3d9759(0x3d2)];if(_0x5117ae[_0x3d9759(0x42d)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x259b61=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1fa3ba of _0x259b61){if(!$gameSwitches[_0x3d9759(0x37b)](_0x1fa3ba))return![];}return!![];}if(_0x5117ae[_0x3d9759(0x42d)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x48c8c3=JSON['parse']('['+RegExp['$1'][_0x3d9759(0x42d)](/\d+/g)+']');for(const _0x21c2e2 of _0x48c8c3){if(!$gameSwitches[_0x3d9759(0x37b)](_0x21c2e2))return![];}return!![];}if(_0x5117ae[_0x3d9759(0x42d)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3d9759(0x1fb)!==_0x3d9759(0x1fb)){function _0x1e08c1(){const _0x922fa5=_0x3d9759,_0x57babe=_0x1f39d9[_0x922fa5(0x394)],_0xabebc3=[_0x922fa5(0x252),_0x922fa5(0x3e0),_0x922fa5(0x432),_0x922fa5(0x388),'stateTpSlipDamageJS',_0x922fa5(0x4ee)];for(const _0x56e399 of _0xabebc3){_0x57babe[_0x56e399][_0x31c93f]&&_0x57babe[_0x56e399][_0x57aa98]['call'](this,_0xfceb52);}}}else{const _0x38dbd3=JSON[_0x3d9759(0x320)]('['+RegExp['$1'][_0x3d9759(0x42d)](/\d+/g)+']');for(const _0x177791 of _0x38dbd3){if($gameSwitches[_0x3d9759(0x37b)](_0x177791))return!![];}return![];}}if(_0x5117ae[_0x3d9759(0x42d)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3d9759(0x309)!=='qLHjp'){const _0x1bedc7=JSON[_0x3d9759(0x320)]('['+RegExp['$1'][_0x3d9759(0x42d)](/\d+/g)+']');for(const _0x5af9b5 of _0x1bedc7){if(!$gameSwitches[_0x3d9759(0x37b)](_0x5af9b5))return!![];}return![];}else{function _0x4ebf4c(){const _0xc64c2a=_0x3d9759;if(typeof _0x5e0cae!==_0xc64c2a(0x319))_0x51aae3=_0x41da6f['id'];this[_0xc64c2a(0x323)]=this[_0xc64c2a(0x323)]||{},this[_0xc64c2a(0x323)][_0x3ed515]=_0x4d640b;}}}if(_0x5117ae[_0x3d9759(0x42d)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x217014=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x21c36f of _0x217014){if(!$gameSwitches[_0x3d9759(0x37b)](_0x21c36f))return!![];}return![];}if(_0x5117ae[_0x3d9759(0x42d)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4f9b91=JSON[_0x3d9759(0x320)]('['+RegExp['$1'][_0x3d9759(0x42d)](/\d+/g)+']');for(const _0x11ad27 of _0x4f9b91){if($gameSwitches['value'](_0x11ad27))return![];}return!![];}return!![];},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x345)]=function(_0x461707){const _0x294a2b=_0x191967,_0x5c8f3a=_0x461707[_0x294a2b(0x3d2)],_0x281dec=VisuMZ[_0x294a2b(0x394)][_0x294a2b(0x430)];if(_0x281dec[_0x461707['id']]){if(_0x294a2b(0x3cf)===_0x294a2b(0x272)){function _0x44ecfb(){const _0x4d2e57=_0x294a2b,_0x569f6f=_0xca4d31(_0x3eaa43['$1']);_0x20d410[_0x4d2e57(0x4cd)](_0x569f6f);}}else return _0x281dec[_0x461707['id']][_0x294a2b(0x344)](this,_0x461707);}else return!![];},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x4b2)]=function(_0x173c1b){const _0x38b18c=_0x191967;return VisuMZ[_0x38b18c(0x394)][_0x38b18c(0x276)][_0x38b18c(0x23a)]['SkillConditionJS']['call'](this,_0x173c1b);},VisuMZ[_0x191967(0x394)][_0x191967(0x2e6)]=Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x286)],Game_BattlerBase[_0x191967(0x29e)]['skillMpCost']=function(_0x2ad9d2){const _0x39ec79=_0x191967;for(settings of VisuMZ[_0x39ec79(0x394)]['Settings'][_0x39ec79(0x480)]){if(settings[_0x39ec79(0x24a)][_0x39ec79(0x412)]()==='MP'){if('sbTxa'!==_0x39ec79(0x2af))return settings[_0x39ec79(0x35b)][_0x39ec79(0x344)](this,_0x2ad9d2);else{function _0x150e90(){const _0x191a22=_0x39ec79;this[_0x191a22(0x207)]=this[_0x191a22(0x207)]||{};if(this[_0x191a22(0x207)][_0x22eb0e])return this[_0x191a22(0x207)][_0x527d5b];return _0x5e7bf4[_0x2d9e26]['note'][_0x191a22(0x42d)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x191a22(0x207)][_0x40c97c]=_0x5e32e7(_0x19ed57['$1']):this[_0x191a22(0x207)][_0x1558da]=_0x33d885[_0x191a22(0x394)][_0x191a22(0x276)][_0x191a22(0x273)][_0x191a22(0x41b)],this[_0x191a22(0x207)][_0x5c8038];}}}}return VisuMZ[_0x39ec79(0x394)][_0x39ec79(0x2e6)][_0x39ec79(0x344)](this,_0x2ad9d2);},VisuMZ[_0x191967(0x394)][_0x191967(0x278)]=Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x404)],Game_BattlerBase['prototype'][_0x191967(0x404)]=function(_0x3da695){const _0x4b655c=_0x191967;for(settings of VisuMZ[_0x4b655c(0x394)][_0x4b655c(0x276)][_0x4b655c(0x480)]){if(settings[_0x4b655c(0x24a)][_0x4b655c(0x412)]()==='TP'){if(_0x4b655c(0x431)===_0x4b655c(0x431))return settings['CalcJS'][_0x4b655c(0x344)](this,_0x3da695);else{function _0x470e45(){const _0x437468=_0x4b655c,_0x4a2b3b=_0x383d80[_0x437468(0x320)]('['+_0x5a09fa['$1']['match'](/\d+/g)+']');for(const _0x304ed7 of _0x4a2b3b){if(_0x59323b[_0x437468(0x37b)](_0x304ed7))return![];}return!![];}}}}return VisuMZ[_0x4b655c(0x394)]['Game_BattlerBase_skillTpCost']['call'](this,_0x3da695);},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x395)]=function(_0x54a214){const _0x1712ef=_0x191967;if(typeof _0x54a214===_0x1712ef(0x319))_0x54a214=$dataStates[_0x54a214];return this['states']()[_0x1712ef(0x398)](_0x54a214);},VisuMZ['SkillsStatesCore'][_0x191967(0x1f2)]=Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x451)],Game_BattlerBase[_0x191967(0x29e)]['states']=function(){const _0x4b24d4=_0x191967;let _0x66fc99=VisuMZ[_0x4b24d4(0x394)][_0x4b24d4(0x1f2)][_0x4b24d4(0x344)](this);if(this[_0x4b24d4(0x2bd)])return _0x66fc99;return this[_0x4b24d4(0x2bd)]=!![],this['addPassiveStates'](_0x66fc99),this[_0x4b24d4(0x2bd)]=undefined,_0x66fc99;},Game_BattlerBase['prototype']['addPassiveStates']=function(_0x2f7c1f){const _0x51fc55=_0x191967,_0x8d1f6d=this['passiveStates']();for(state of _0x8d1f6d){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x2f7c1f['includes'](state))continue;_0x2f7c1f[_0x51fc55(0x437)](state);}if(_0x8d1f6d[_0x51fc55(0x2a7)]>0x0){if(_0x51fc55(0x258)===_0x51fc55(0x413)){function _0x8c59ea(){const _0x5039c0=_0x51fc55;for(_0x24a2b6 of _0x482bf6[_0x5039c0(0x394)][_0x5039c0(0x276)][_0x5039c0(0x480)]){if(_0x44239e['Name'][_0x5039c0(0x412)]()==='TP')return _0x2d61aa[_0x5039c0(0x35b)]['call'](this,_0x556ec2);}return _0x41de89[_0x5039c0(0x394)]['Game_BattlerBase_skillTpCost'][_0x5039c0(0x344)](this,_0x2dc077);}}else _0x2f7c1f[_0x51fc55(0x4eb)]((_0x170b9c,_0x15eee3)=>{const _0x472ba1=_0x51fc55,_0x271e52=_0x170b9c[_0x472ba1(0x22b)],_0xd1de72=_0x15eee3[_0x472ba1(0x22b)];if(_0x271e52!==_0xd1de72){if(_0x472ba1(0x359)!==_0x472ba1(0x2ef))return _0xd1de72-_0x271e52;else{function _0x3c044a(){const _0x5b4b39=_0x472ba1,_0x489f9f=this[_0x5b4b39(0x4bc)](_0x1cb8e0);this[_0x5b4b39(0x468)](_0x489f9f,'skill',!![],_0x401777);}}}return _0x170b9c-_0x15eee3;});}},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x2b5)]=function(_0x598328){const _0x4b51b3=_0x191967;return _0x598328[_0x4b51b3(0x3d2)][_0x4b51b3(0x42d)](/<PASSIVE STACKABLE>/i);},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x48c)]=function(){const _0x4ca070=_0x191967,_0x3cd45e=[];for(const _0x14dadc of this['_cache'][_0x4ca070(0x406)]){const _0x3b20a6=$dataStates[_0x14dadc];if(!_0x3b20a6)continue;if(!this[_0x4ca070(0x310)](_0x3b20a6))continue;_0x3cd45e[_0x4ca070(0x437)](_0x3b20a6);}return _0x3cd45e;},Game_BattlerBase[_0x191967(0x29e)]['meetsPassiveStateConditions']=function(_0xe56953){const _0x53ba2e=_0x191967;if(!this['meetsPassiveStateConditionClasses'](_0xe56953))return![];if(!this[_0x53ba2e(0x3e3)](_0xe56953))return![];if(!this[_0x53ba2e(0x2d3)](_0xe56953))return![];if(!this[_0x53ba2e(0x31c)](_0xe56953))return![];return!![];},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x4d0)]=function(_0x232973){return!![];},Game_Actor[_0x191967(0x29e)][_0x191967(0x4d0)]=function(_0x4ccc82){const _0x43ab84=_0x191967,_0x32cbcd=_0x4ccc82[_0x43ab84(0x3d2)];if(_0x32cbcd[_0x43ab84(0x42d)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){if(_0x43ab84(0x2df)===_0x43ab84(0x2df)){const _0x2684dd=String(RegExp['$1'])[_0x43ab84(0x3ee)](',')[_0x43ab84(0x2ea)](_0x2bdd5f=>_0x2bdd5f[_0x43ab84(0x464)]()),_0x496c9f=VisuMZ[_0x43ab84(0x394)][_0x43ab84(0x30e)](_0x2684dd);return _0x496c9f[_0x43ab84(0x398)](this['currentClass']());}else{function _0x52a3ee(){const _0x32d4e9=_0x43ab84;if(this['_tempActor']||this[_0x32d4e9(0x43e)])return;const _0x202a77=_0x256947[_0x32d4e9(0x394)]['stateExpireJS'];if(_0x202a77[_0x4615c2])_0x202a77[_0x13e379]['call'](this,_0x39f5d6);}}}if(_0x32cbcd[_0x43ab84(0x42d)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if(_0x43ab84(0x338)==='QnOYg'){function _0x31ea96(){const _0x21e32d=_0x43ab84;if(!this[_0x21e32d(0x37c)][_0x21e32d(0x391)](_0x38569c))return![];}}else{const _0x33ff04=String(RegExp['$1'])[_0x43ab84(0x3ee)](',')[_0x43ab84(0x2ea)](_0x4e99fc=>_0x4e99fc[_0x43ab84(0x464)]()),_0x336878=VisuMZ[_0x43ab84(0x394)]['ParseClassIDs'](_0x33ff04);let _0x5194d5=[this[_0x43ab84(0x4c8)]()];return Imported[_0x43ab84(0x282)]&&this[_0x43ab84(0x1f1)]&&(_0x5194d5=this[_0x43ab84(0x1f1)]()),_0x336878[_0x43ab84(0x3b2)](_0x219325=>_0x5194d5['includes'](_0x219325))[_0x43ab84(0x2a7)]>0x0;}}return Game_BattlerBase[_0x43ab84(0x29e)][_0x43ab84(0x4d0)][_0x43ab84(0x344)](this,_0x4ccc82);},VisuMZ[_0x191967(0x394)][_0x191967(0x30e)]=function(_0x49d6b0){const _0x16187a=_0x191967,_0x1bc0a6=[];for(let _0x173d7e of _0x49d6b0){if(_0x16187a(0x2f1)===_0x16187a(0x2f1)){_0x173d7e=(String(_0x173d7e)||'')[_0x16187a(0x464)]();const _0x50fc66=/^\d+$/[_0x16187a(0x3a8)](_0x173d7e);_0x50fc66?_0x1bc0a6[_0x16187a(0x437)](Number(_0x173d7e)):_0x1bc0a6['push'](DataManager[_0x16187a(0x2b6)](_0x173d7e));}else{function _0x116e4b(){return _0x3bea1f(_0x11be82['$1']);}}}return _0x1bc0a6['map'](_0x29a78d=>$dataClasses[Number(_0x29a78d)])[_0x16187a(0x33c)](null);},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x3e3)]=function(_0x406617){const _0xb0a5be=_0x191967,_0x310759=_0x406617[_0xb0a5be(0x3d2)];if(_0x310759[_0xb0a5be(0x42d)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb0a5be(0x32c)!==_0xb0a5be(0x422)){const _0x586fb7=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xe366c2 of _0x586fb7){if('KbSze'!==_0xb0a5be(0x45a)){if(!$gameSwitches['value'](_0xe366c2))return![];}else{function _0x20f583(){const _0x45b1ad=_0xb0a5be,_0x4b63dc=_0x57c28e[_0x45b1ad(0x2c4)]['Settings'][_0x45b1ad(0x2cd)]['DisplayedParams'],_0xf00da2=_0xc41a43[_0x45b1ad(0x2ce)](_0x3ac49d/0x2)-0x18;let _0x5e188a=_0x2db8ce,_0x208f67=_0x317059[_0x45b1ad(0x2ce)]((this[_0x45b1ad(0x2c7)]-_0x5c9962[_0x45b1ad(0x241)](_0x4b63dc[_0x45b1ad(0x2a7)]/0x2)*_0x38f929)/0x2),_0x48f8d7=0x0;for(const _0x4af53b of _0x4b63dc){this[_0x45b1ad(0x233)](_0x5e188a,_0x208f67,_0xf00da2,_0x4af53b),_0x48f8d7++,_0x48f8d7%0x2===0x0?(_0x5e188a=_0x1d692b,_0x208f67+=_0x291cf8):_0x5e188a+=_0xf00da2+0x18;}}}}return!![];}else{function _0x2372b2(){const _0x5d948a=_0xb0a5be;if(!_0x302d86[_0x5d948a(0x37b)](_0xab88ec))return![];}}}if(_0x310759[_0xb0a5be(0x42d)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x7576d8=JSON[_0xb0a5be(0x320)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5e3dad of _0x7576d8){if(_0xb0a5be(0x428)!==_0xb0a5be(0x428)){function _0x4e36b4(){const _0x50d6e6=_0xb0a5be;this[_0x50d6e6(0x205)](_0x204bc1),this[_0x50d6e6(0x4de)](_0xf2d413),this[_0x50d6e6(0x367)](_0x1191ef),this[_0x50d6e6(0x35e)](_0x245758);}}else{if(!$gameSwitches[_0xb0a5be(0x37b)](_0x5e3dad))return![];}}return!![];}if(_0x310759[_0xb0a5be(0x42d)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d493e=JSON[_0xb0a5be(0x320)]('['+RegExp['$1'][_0xb0a5be(0x42d)](/\d+/g)+']');for(const _0x2ef2ea of _0x2d493e){if($gameSwitches[_0xb0a5be(0x37b)](_0x2ef2ea))return!![];}return![];}if(_0x310759['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb0a5be(0x4d1)===_0xb0a5be(0x30a)){function _0x235662(){return _0x4c4dcf(_0x1b1b10['$1']);}}else{const _0x4d1fa8=JSON[_0xb0a5be(0x320)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x13f0d6 of _0x4d1fa8){if(!$gameSwitches[_0xb0a5be(0x37b)](_0x13f0d6))return!![];}return![];}}if(_0x310759[_0xb0a5be(0x42d)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb0a5be(0x221)===_0xb0a5be(0x2fb)){function _0x1d17e0(){const _0x3b8e96=_0xb0a5be;for(const _0x1dde5a of _0x55bbfa){let _0x4b401a=0x0,_0x2c3466=0x0;if(_0x1dde5a['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x4b401a=_0x4b5023(_0xaa98fc['$1']),_0x2c3466=_0x56fc07(_0xe79c59['$2']);else _0x1dde5a['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x4b401a=_0x5919ba[_0x3b8e96(0x38b)](_0x517318['$1']),_0x2c3466=_0x1c6064(_0x21e665['$2']));_0x57a221[_0x3b8e96(0x2ff)](_0x4b401a,_0x2c3466),this[_0x3b8e96(0x443)](_0x3fd78b);}}}else{const _0x261cc4=JSON[_0xb0a5be(0x320)]('['+RegExp['$1'][_0xb0a5be(0x42d)](/\d+/g)+']');for(const _0x462912 of _0x261cc4){if(!$gameSwitches[_0xb0a5be(0x37b)](_0x462912))return!![];}return![];}}if(_0x310759['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b72c1=JSON[_0xb0a5be(0x320)]('['+RegExp['$1'][_0xb0a5be(0x42d)](/\d+/g)+']');for(const _0x370dda of _0x1b72c1){if(_0xb0a5be(0x410)==='KQFnT'){function _0x14607d(){const _0x5e1827=_0xb0a5be;_0x1d1159[_0x5e1827(0x3d4)]['push'](_0x53d26a[_0x5e1827(0x412)]()[_0x5e1827(0x464)]());}}else{if($gameSwitches[_0xb0a5be(0x37b)](_0x370dda))return![];}}return!![];}return!![];},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x2d3)]=function(_0x121a92){const _0xabf5ba=_0x191967,_0x7e3614=VisuMZ[_0xabf5ba(0x394)][_0xabf5ba(0x2e7)];if(_0x7e3614[_0x121a92['id']]&&!_0x7e3614[_0x121a92['id']][_0xabf5ba(0x344)](this,_0x121a92))return![];return!![];},Game_BattlerBase[_0x191967(0x29e)]['meetsPassiveStateGlobalConditionJS']=function(_0x279038){const _0x1d7710=_0x191967;return VisuMZ['SkillsStatesCore'][_0x1d7710(0x276)][_0x1d7710(0x41e)][_0x1d7710(0x2a2)]['call'](this,_0x279038);},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x406)]=function(){const _0x37cbbc=_0x191967;if(this['checkCacheKey'](_0x37cbbc(0x406)))return this['convertPassiveStates']();if(this[_0x37cbbc(0x39d)])return[];return this[_0x37cbbc(0x39d)]=!![],this[_0x37cbbc(0x483)][_0x37cbbc(0x406)]=[],this['addPassiveStatesFromOtherPlugins'](),this[_0x37cbbc(0x460)](),this['addPassiveStatesByPluginParameters'](),this['_checkingVisuMzPassiveStateObjects']=undefined,this['convertPassiveStates']();},Game_BattlerBase[_0x191967(0x29e)]['addPassiveStatesFromOtherPlugins']=function(){const _0xe67875=_0x191967;if(Imported[_0xe67875(0x2aa)])this['addPassiveStatesTraitSets']();},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x439)]=function(){return[];},Game_BattlerBase[_0x191967(0x29e)]['addPassiveStatesByNotetag']=function(){const _0x552d0f=_0x191967,_0x6fb635=this['passiveStateObjects']();for(const _0x373e36 of _0x6fb635){if(!_0x373e36)continue;const _0x29d43f=_0x373e36['note']['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x29d43f)for(const _0x26f96f of _0x29d43f){if(_0x552d0f(0x322)!=='FhRpx'){_0x26f96f[_0x552d0f(0x42d)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x12ae38=RegExp['$1'];if(_0x12ae38[_0x552d0f(0x42d)](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x552d0f(0x4c3)===_0x552d0f(0x48d)){function _0x29383d(){const _0x5b9f4d=_0x552d0f;for(let _0x375029=0x0;_0x375029<this[_0x5b9f4d(0x49a)]();_0x375029++){if(this[_0x5b9f4d(0x34a)](_0x375029)){const _0x3ad750=this[_0x5b9f4d(0x482)][_0x375029];this[_0x5b9f4d(0x230)](_0x375029);if(_0x3ad750>0x0)this[_0x5b9f4d(0x2e4)](_0x375029);if(_0x3ad750<0x0)this[_0x5b9f4d(0x39c)](_0x375029);}}}}else{const _0x275a9b=JSON[_0x552d0f(0x320)]('['+RegExp['$1'][_0x552d0f(0x42d)](/\d+/g)+']');this[_0x552d0f(0x483)][_0x552d0f(0x406)]=this[_0x552d0f(0x483)]['passiveStates']['concat'](_0x275a9b);}}else{if(_0x552d0f(0x3f8)===_0x552d0f(0x3f8)){const _0x201218=_0x12ae38[_0x552d0f(0x3ee)](',');for(const _0x4bbd62 of _0x201218){const _0x1c3e8e=DataManager['getStateIdWithName'](_0x4bbd62);if(_0x1c3e8e)this[_0x552d0f(0x483)][_0x552d0f(0x406)]['push'](_0x1c3e8e);}}else{function _0x5cf377(){const _0x499212=_0x552d0f,_0x54e3a2=this['_buffs'][_0x33672c];_0x4f9367['SkillsStatesCore']['Game_BattlerBase_eraseBuff'][_0x499212(0x344)](this,_0x2a3f24);if(_0x54e3a2>0x0)this[_0x499212(0x3d0)](_0x24d60e);if(_0x54e3a2<0x0)this[_0x499212(0x2b4)](_0x5361d3);}}}}else{function _0x3ee13b(){const _0x575f27=_0x552d0f,_0x3108a6=this[_0x575f27(0x4af)](_0x3fd0df)[_0x575f27(0x3b2)](_0x405e98=>this['isStateAffected'](_0x405e98['id']));return _0x3108a6[_0x575f27(0x2a7)];}}}}},Game_BattlerBase[_0x191967(0x29e)]['addPassiveStatesByPluginParameters']=function(){const _0x2b0e9f=_0x191967,_0x57f70b=VisuMZ[_0x2b0e9f(0x394)][_0x2b0e9f(0x276)][_0x2b0e9f(0x41e)][_0x2b0e9f(0x2e3)];this[_0x2b0e9f(0x483)][_0x2b0e9f(0x406)]=this['_cache'][_0x2b0e9f(0x406)]['concat'](_0x57f70b);},Game_BattlerBase['prototype'][_0x191967(0x3c1)]=function(_0x3c8bc9){if(typeof _0x3c8bc9!=='number')_0x3c8bc9=_0x3c8bc9['id'];return this['_stateTurns'][_0x3c8bc9]||0x0;},Game_BattlerBase[_0x191967(0x29e)]['setStateTurns']=function(_0x54cd08,_0x390647){const _0x3fd23d=_0x191967;if(typeof _0x54cd08!==_0x3fd23d(0x319))_0x54cd08=_0x54cd08['id'];if(this[_0x3fd23d(0x23c)](_0x54cd08)){const _0x467185=DataManager[_0x3fd23d(0x454)](_0x54cd08);this[_0x3fd23d(0x346)][_0x54cd08]=_0x390647['clamp'](0x0,_0x467185);if(this[_0x3fd23d(0x346)][_0x54cd08]<=0x0)this[_0x3fd23d(0x3a3)](_0x54cd08);}},Game_BattlerBase['prototype'][_0x191967(0x3af)]=function(_0x5633d4,_0x402051){const _0x5c6a2a=_0x191967;if(typeof _0x5633d4!=='number')_0x5633d4=_0x5633d4['id'];this[_0x5c6a2a(0x23c)](_0x5633d4)&&(_0x402051+=this[_0x5c6a2a(0x3c1)](_0x5633d4),this[_0x5c6a2a(0x2ff)](_0x5633d4,_0x402051));},VisuMZ[_0x191967(0x394)][_0x191967(0x354)]=Game_BattlerBase['prototype'][_0x191967(0x228)],Game_BattlerBase[_0x191967(0x29e)]['eraseBuff']=function(_0x270535){const _0x5e15c0=_0x191967,_0x1c464d=this[_0x5e15c0(0x482)][_0x270535];VisuMZ[_0x5e15c0(0x394)][_0x5e15c0(0x354)][_0x5e15c0(0x344)](this,_0x270535);if(_0x1c464d>0x0)this[_0x5e15c0(0x3d0)](_0x270535);if(_0x1c464d<0x0)this['onEraseDebuff'](_0x270535);},VisuMZ['SkillsStatesCore'][_0x191967(0x466)]=Game_BattlerBase[_0x191967(0x29e)]['increaseBuff'],Game_BattlerBase['prototype'][_0x191967(0x352)]=function(_0x42af73){const _0x14c1b5=_0x191967;VisuMZ[_0x14c1b5(0x394)][_0x14c1b5(0x466)][_0x14c1b5(0x344)](this,_0x42af73);if(!this[_0x14c1b5(0x27b)](_0x42af73))this[_0x14c1b5(0x228)](_0x42af73);},VisuMZ[_0x191967(0x394)][_0x191967(0x2e0)]=Game_BattlerBase['prototype']['decreaseBuff'],Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x1fe)]=function(_0x4d10d0){const _0x4fb4de=_0x191967;VisuMZ[_0x4fb4de(0x394)][_0x4fb4de(0x2e0)][_0x4fb4de(0x344)](this,_0x4d10d0);if(!this[_0x4fb4de(0x27b)](_0x4d10d0))this['eraseBuff'](_0x4d10d0);},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x3d0)]=function(_0x300fa9){},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x2b4)]=function(_0x5840e4){},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x364)]=function(_0x2b0bc8){const _0x363001=_0x191967;return this['_buffs'][_0x2b0bc8]===VisuMZ[_0x363001(0x394)][_0x363001(0x276)][_0x363001(0x317)][_0x363001(0x43f)];},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x490)]=function(_0x48d10b){const _0x3c08ce=_0x191967;return this['_buffs'][_0x48d10b]===-VisuMZ[_0x3c08ce(0x394)][_0x3c08ce(0x276)][_0x3c08ce(0x317)]['StackDebuffMax'];},VisuMZ[_0x191967(0x394)][_0x191967(0x4bb)]=Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x46e)],Game_BattlerBase[_0x191967(0x29e)]['buffIconIndex']=function(_0x3faa5e,_0x1606fb){const _0x51d30f=_0x191967;return _0x3faa5e=_0x3faa5e[_0x51d30f(0x3a7)](-0x2,0x2),VisuMZ[_0x51d30f(0x394)][_0x51d30f(0x4bb)][_0x51d30f(0x344)](this,_0x3faa5e,_0x1606fb);},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x382)]=function(_0x34432d){const _0x5cbf93=_0x191967,_0x8a78d=this['_buffs'][_0x34432d];return VisuMZ[_0x5cbf93(0x394)][_0x5cbf93(0x276)]['Buffs']['MultiplierJS'][_0x5cbf93(0x344)](this,_0x34432d,_0x8a78d);},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x2dd)]=function(_0x1f87c0){return this['_buffTurns'][_0x1f87c0]||0x0;},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x487)]=function(_0x593697){const _0x5946d3=_0x191967;return this[_0x5946d3(0x2dd)](_0x593697);},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x4e1)]=function(_0x13aabd,_0x4dad60){const _0x350059=_0x191967;if(this[_0x350059(0x3bf)](_0x13aabd)){const _0x5dd83d=VisuMZ['SkillsStatesCore']['Settings'][_0x350059(0x317)][_0x350059(0x41b)];this['_buffTurns'][_0x13aabd]=_0x4dad60[_0x350059(0x3a7)](0x0,_0x5dd83d);}},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x324)]=function(_0x204dc4,_0x5471f6){const _0x5363f7=_0x191967;this[_0x5363f7(0x3bf)](_0x204dc4)&&(_0x5471f6+=this[_0x5363f7(0x2dd)](stateId),this['setStateTurns'](_0x204dc4,_0x5471f6));},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x4a5)]=function(_0x72e625,_0x11f169){const _0x2319c7=_0x191967;if(this[_0x2319c7(0x2ab)](_0x72e625)){if(_0x2319c7(0x27c)===_0x2319c7(0x27c)){const _0x57d691=VisuMZ[_0x2319c7(0x394)][_0x2319c7(0x276)][_0x2319c7(0x317)]['MaxTurns'];this['_buffTurns'][_0x72e625]=_0x11f169[_0x2319c7(0x3a7)](0x0,_0x57d691);}else{function _0x2facd1(){return this['updatedLayoutStyle']()['match'](/RIGHT/i);}}}},Game_BattlerBase[_0x191967(0x29e)]['addDebuffTurns']=function(_0x3ab424,_0x1ebf84){const _0x21c454=_0x191967;if(this[_0x21c454(0x2ab)](_0x3ab424)){if(_0x21c454(0x25f)===_0x21c454(0x34e)){function _0x2a0bc7(){const _0x2ff9b1=_0x21c454;this[_0x2ff9b1(0x225)]['fontFace']=_0xe1ce2c[_0x2ff9b1(0x299)](),this[_0x2ff9b1(0x225)][_0x2ff9b1(0x420)]=_0x240a09['mainFontSize'](),this[_0x2ff9b1(0x23b)]();}}else _0x1ebf84+=this[_0x21c454(0x2dd)](stateId),this['setStateTurns'](_0x3ab424,_0x1ebf84);}},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x3db)]=function(_0x8c8124){const _0x1f7fab=_0x191967;if(typeof _0x8c8124!=='number')_0x8c8124=_0x8c8124['id'];return this[_0x1f7fab(0x33d)]=this[_0x1f7fab(0x33d)]||{},this[_0x1f7fab(0x33d)][_0x8c8124]=this[_0x1f7fab(0x33d)][_0x8c8124]||{},this[_0x1f7fab(0x33d)][_0x8c8124];},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x250)]=function(_0x1dc24e,_0x3aa97a){const _0xc0e209=_0x191967;if(typeof _0x1dc24e!=='number')_0x1dc24e=_0x1dc24e['id'];const _0x3b95ee=this[_0xc0e209(0x3db)](_0x1dc24e);return _0x3b95ee[_0x3aa97a];},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x22f)]=function(_0xa49b1f,_0xd953b1,_0x148b37){const _0x5ee8dd=_0x191967;if(typeof _0xa49b1f!==_0x5ee8dd(0x319))_0xa49b1f=_0xa49b1f['id'];const _0xc17a1c=this[_0x5ee8dd(0x3db)](_0xa49b1f);_0xc17a1c[_0xd953b1]=_0x148b37;},Game_BattlerBase['prototype'][_0x191967(0x47d)]=function(_0x56124a){const _0x3ad219=_0x191967;if(typeof _0x56124a!==_0x3ad219(0x319))_0x56124a=_0x56124a['id'];this[_0x3ad219(0x33d)]=this[_0x3ad219(0x33d)]||{},this[_0x3ad219(0x33d)][_0x56124a]={};},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x488)]=function(_0x3d630d){const _0x19602a=_0x191967;if(typeof _0x3d630d!==_0x19602a(0x319))_0x3d630d=_0x3d630d['id'];return this[_0x19602a(0x323)]=this[_0x19602a(0x323)]||{},this[_0x19602a(0x323)][_0x3d630d]===undefined&&(this[_0x19602a(0x323)][_0x3d630d]=''),this[_0x19602a(0x323)][_0x3d630d];},Game_BattlerBase[_0x191967(0x29e)]['setStateDisplay']=function(_0x3522fb,_0x1a62ea){const _0x5bdc8a=_0x191967;if(typeof _0x3522fb!==_0x5bdc8a(0x319))_0x3522fb=_0x3522fb['id'];this[_0x5bdc8a(0x323)]=this['_stateDisplay']||{},this[_0x5bdc8a(0x323)][_0x3522fb]=_0x1a62ea;},Game_BattlerBase[_0x191967(0x29e)]['clearStateDisplay']=function(_0x556644){const _0x5de916=_0x191967;if(typeof _0x556644!==_0x5de916(0x319))_0x556644=_0x556644['id'];this[_0x5de916(0x323)]=this[_0x5de916(0x323)]||{},this[_0x5de916(0x323)][_0x556644]='';},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x312)]=function(_0xa32739){const _0x314b54=_0x191967;if(typeof _0xa32739!==_0x314b54(0x319))_0xa32739=_0xa32739['id'];this[_0x314b54(0x2c3)]=this[_0x314b54(0x2c3)]||{},this[_0x314b54(0x2c3)][_0xa32739]=this[_0x314b54(0x2c3)][_0xa32739]||_0x314b54(0x4c0);const _0x1d937f=this[_0x314b54(0x2c3)][_0xa32739];return this[_0x314b54(0x2a3)](_0x1d937f);},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x205)]=function(_0x43b0b0,_0x18d06c){const _0x52ad86=_0x191967;this[_0x52ad86(0x2c3)]=this[_0x52ad86(0x2c3)]||{};const _0x39d07f=_0x18d06c?this[_0x52ad86(0x21b)](_0x18d06c):this[_0x52ad86(0x341)]();this[_0x52ad86(0x2c3)][_0x43b0b0]=_0x39d07f;},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x4e4)]=function(_0x448218){const _0x51df0d=_0x191967;this[_0x51df0d(0x2c3)]=this[_0x51df0d(0x2c3)]||{},delete this[_0x51df0d(0x2c3)][_0x448218];},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x341)]=function(){const _0x47e1c0=_0x191967,_0x10cc01=this['getCurrentStateActiveUser']();return this[_0x47e1c0(0x21b)](_0x10cc01);},Game_BattlerBase['prototype'][_0x191967(0x363)]=function(){const _0x2ab1ba=_0x191967;if($gameParty[_0x2ab1ba(0x43a)]()){if('ahnFx'!==_0x2ab1ba(0x2f7)){if(BattleManager['_subject']){if(_0x2ab1ba(0x1f5)===_0x2ab1ba(0x438)){function _0x570505(){const _0x336ba0=_0x2ab1ba,_0x32cea1=_0x4059ed[_0x336ba0(0x3d2)];_0x32cea1[_0x336ba0(0x42d)](/<MP COST:[ ](\d+)>/i)&&(_0x3fb7d0[_0x336ba0(0x400)]=_0x56cbd5(_0x22453b['$1'])),_0x32cea1[_0x336ba0(0x42d)](/<TP COST:[ ](\d+)>/i)&&(_0x8f907f[_0x336ba0(0x4a7)]=_0x339a30(_0x1172e8['$1']));}}else return BattleManager['_subject'];}else{if(BattleManager[_0x2ab1ba(0x23e)])return BattleManager[_0x2ab1ba(0x23e)];}}else{function _0xbba679(){const _0x4d242e=_0x2ab1ba,_0x28b55f=_0x5135df[_0x4d242e(0x320)]('['+_0x3f40d4['$1'][_0x4d242e(0x42d)](/\d+/g)+']');for(const _0x1c6d2c of _0x28b55f){if(this[_0x4d242e(0x37c)][_0x4d242e(0x214)](_0x1c6d2c))return!![];}return![];}}}else{if(_0x2ab1ba(0x457)!==_0x2ab1ba(0x3dc)){const _0x2a4143=SceneManager[_0x2ab1ba(0x1fd)];if(![Scene_Map,Scene_Item][_0x2ab1ba(0x398)](_0x2a4143[_0x2ab1ba(0x4ed)])){if(_0x2ab1ba(0x37f)==='aSlPu'){function _0x414bc6(){const _0x57ddc6=_0x2ab1ba;return _0x3557a8[_0x57ddc6(0x394)][_0x57ddc6(0x47e)]['call'](this);}}else return $gameParty[_0x2ab1ba(0x202)]();}}else{function _0x13bbae(){const _0x56ff79=_0x2ab1ba;this[_0x56ff79(0x210)][_0x234c76]=this[_0x56ff79(0x3e9)](_0x4c6ca8(_0x5c70ac));}}}return this;},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x21b)]=function(_0x425b10){const _0x4b25db=_0x191967;if(!_0x425b10)return'user';if(_0x425b10[_0x4b25db(0x41c)]())return _0x4b25db(0x231)[_0x4b25db(0x2f0)](_0x425b10[_0x4b25db(0x266)]());else{const _0x539ddf=_0x4b25db(0x2e9)[_0x4b25db(0x2f0)](_0x425b10['enemyId']()),_0x3c5dde='<member-%1>'[_0x4b25db(0x2f0)](_0x425b10[_0x4b25db(0x2d7)]()),_0xd75bf=_0x4b25db(0x243)[_0x4b25db(0x2f0)]($gameTroop[_0x4b25db(0x3c6)]());return _0x4b25db(0x42b)['format'](_0x539ddf,_0x3c5dde,_0xd75bf);}return _0x4b25db(0x4c0);},Game_BattlerBase['prototype'][_0x191967(0x2a3)]=function(_0x92d745){const _0x50c6bb=_0x191967;if(_0x92d745===_0x50c6bb(0x4c0))return this;else{if(_0x92d745[_0x50c6bb(0x42d)](/<actor-(\d+)>/i)){if(_0x50c6bb(0x3b9)==='jKttn'){function _0x5a335d(){this['clearStatesWithStateRetain']();}}else return $gameActors[_0x50c6bb(0x235)](Number(RegExp['$1']));}else{if('AuhEt'==='AuhEt'){if($gameParty[_0x50c6bb(0x43a)]()&&_0x92d745[_0x50c6bb(0x42d)](/<troop-(\d+)>/i)){const _0x2d89e2=Number(RegExp['$1']);if(_0x2d89e2===$gameTroop[_0x50c6bb(0x3c6)]()){if(_0x50c6bb(0x32e)!==_0x50c6bb(0x1f8)){if(_0x92d745[_0x50c6bb(0x42d)](/<member-(\d+)>/i))return $gameTroop[_0x50c6bb(0x377)]()[Number(RegExp['$1'])];}else{function _0x1a384d(){const _0x15d130=_0x50c6bb;this[_0x15d130(0x22c)]();const _0x116d06=_0x1e7dd7[_0x15f76b];if(_0x116d06)!_0x5696aa[_0x15d130(0x398)](_0x116d06)&&this[_0x15d130(0x372)](_0x4f1262,_0x116d06,_0x521e3e,_0x1e31f7),this['drawActorStateData'](_0x48d1f9,_0x116d06,_0x4b3e99,_0x474ab4),_0x227021[_0x15d130(0x437)](_0x116d06);else{const _0x6845de=_0x3de256[_0x1a7b85-_0x317692[_0x15d130(0x2a7)]];this[_0x15d130(0x3a9)](_0x96bdd2,_0x6845de,_0x525d1c,_0x476bb8),this['drawActorBuffRates'](_0x56da0a,_0x6845de,_0x32fc6e,_0x18d1ec);}_0x5ab5c2+=_0x46005a;}}}}if(_0x92d745['match'](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}else{function _0x1c669b(){const _0xdf9e28=_0x50c6bb;return this[_0xdf9e28(0x2dd)](_0x13db9c);}}}}return this;},VisuMZ[_0x191967(0x394)][_0x191967(0x350)]=Game_Battler[_0x191967(0x29e)][_0x191967(0x49d)],Game_Battler[_0x191967(0x29e)]['addState']=function(_0x5c258d){const _0x59ce44=_0x191967,_0x3bedd2=this[_0x59ce44(0x40a)](_0x5c258d);VisuMZ['SkillsStatesCore']['Game_Battler_addState']['call'](this,_0x5c258d);if(_0x3bedd2&&this['hasState']($dataStates[_0x5c258d])){this[_0x59ce44(0x3e7)](_0x5c258d);;}},VisuMZ['SkillsStatesCore'][_0x191967(0x414)]=Game_Battler[_0x191967(0x29e)][_0x191967(0x40a)],Game_Battler[_0x191967(0x29e)]['isStateAddable']=function(_0x372560){const _0x9908c6=_0x191967,_0x54eafd=$dataStates[_0x372560];if(_0x54eafd&&_0x54eafd['note'][_0x9908c6(0x42d)](/<NO DEATH CLEAR>/i)){if('paICq'===_0x9908c6(0x2d2))return!this[_0x9908c6(0x26e)](_0x372560)&&!this[_0x9908c6(0x3fa)](_0x372560)&&!this[_0x9908c6(0x297)][_0x9908c6(0x45b)](_0x372560);else{function _0x58207c(){const _0x536286=_0x9908c6,_0x3be080=_0x1e77e7[_0x1aea68];if(_0x3be080)_0x1355dd[_0x536286(0x437)](_0x3be080);}}}return VisuMZ[_0x9908c6(0x394)][_0x9908c6(0x414)]['call'](this,_0x372560);},Game_Battler['prototype'][_0x191967(0x3e7)]=function(_0x25684c){const _0x1138eb=_0x191967;this[_0x1138eb(0x205)](_0x25684c),this[_0x1138eb(0x4de)](_0x25684c),this['onAddStateCustomJS'](_0x25684c),this['onAddStateGlobalJS'](_0x25684c);},Game_Battler[_0x191967(0x29e)][_0x191967(0x3d5)]=function(_0x56adca){const _0xf8b7fb=_0x191967;Game_BattlerBase[_0xf8b7fb(0x29e)][_0xf8b7fb(0x3d5)][_0xf8b7fb(0x344)](this,_0x56adca),this[_0xf8b7fb(0x442)](_0x56adca),this[_0xf8b7fb(0x291)](_0x56adca);},Game_Battler[_0x191967(0x29e)][_0x191967(0x21d)]=function(_0x592575){const _0x531a4a=_0x191967;for(const _0x477761 of this[_0x531a4a(0x451)]()){this['isStateExpired'](_0x477761['id'])&&_0x477761[_0x531a4a(0x4e9)]===_0x592575&&(this[_0x531a4a(0x3a3)](_0x477761['id']),this[_0x531a4a(0x316)](_0x477761['id']),this['onExpireStateGlobalJS'](_0x477761['id']));}},Game_Battler['prototype'][_0x191967(0x316)]=function(_0x444273){const _0x3325a2=_0x191967;this[_0x3325a2(0x24d)](_0x444273);},Game_Battler[_0x191967(0x29e)][_0x191967(0x367)]=function(_0x34ae3f){const _0x547a6a=_0x191967;if(this['_tempActor']||this['_tempBattler'])return;const _0x2d7f32=VisuMZ[_0x547a6a(0x394)]['stateAddJS'];if(_0x2d7f32[_0x34ae3f])_0x2d7f32[_0x34ae3f][_0x547a6a(0x344)](this,_0x34ae3f);},Game_Battler[_0x191967(0x29e)][_0x191967(0x442)]=function(_0x5d5388){const _0x193086=_0x191967;if(this[_0x193086(0x270)]||this['_tempBattler'])return;const _0x5ce5f7=VisuMZ[_0x193086(0x394)][_0x193086(0x365)];if(_0x5ce5f7[_0x5d5388])_0x5ce5f7[_0x5d5388]['call'](this,_0x5d5388);},Game_Battler['prototype']['onExpireStateCustomJS']=function(_0x3dadf4){const _0x17e1b1=_0x191967;if(this['_tempActor']||this['_tempBattler'])return;const _0x56379e=VisuMZ[_0x17e1b1(0x394)][_0x17e1b1(0x4b5)];if(_0x56379e[_0x3dadf4])_0x56379e[_0x3dadf4][_0x17e1b1(0x344)](this,_0x3dadf4);},Game_Battler[_0x191967(0x29e)][_0x191967(0x35e)]=function(_0x11ea5d){const _0x4702a2=_0x191967;if(this[_0x4702a2(0x270)]||this['_tempBattler'])return;try{if(_0x4702a2(0x215)!==_0x4702a2(0x215)){function _0xc94333(){if(_0x52b672['value'](_0x134ac3))return!![];}}else VisuMZ['SkillsStatesCore'][_0x4702a2(0x276)][_0x4702a2(0x273)][_0x4702a2(0x4d3)][_0x4702a2(0x344)](this,_0x11ea5d);}catch(_0x661198){if($gameTemp[_0x4702a2(0x2bc)]())console[_0x4702a2(0x28d)](_0x661198);}},Game_Battler[_0x191967(0x29e)][_0x191967(0x291)]=function(_0x2d7227){const _0x2f80d4=_0x191967;if(this['_tempActor']||this['_tempBattler'])return;try{if(_0x2f80d4(0x390)!==_0x2f80d4(0x256))VisuMZ[_0x2f80d4(0x394)]['Settings'][_0x2f80d4(0x273)][_0x2f80d4(0x2c5)][_0x2f80d4(0x344)](this,_0x2d7227);else{function _0x45b839(){const _0x1f00c4=_0x2f80d4;_0x125d11[_0x1f00c4(0x42d)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x263fd0=_0x3afc25['indexOf'](_0x22d146(_0x31e9de['$1'])['toUpperCase']()),_0x2b99ac=_0x304e69(_0xdabf24['$2']);_0x263fd0>=0x0&&(_0x1029a1[_0x1f00c4(0x324)](_0x263fd0,_0x2b99ac),this['makeSuccess'](_0x2eed34));}}}catch(_0x13a22d){if(_0x2f80d4(0x218)===_0x2f80d4(0x218)){if($gameTemp[_0x2f80d4(0x2bc)]())console[_0x2f80d4(0x28d)](_0x13a22d);}else{function _0x4aa371(){this['_costSettings']=null;}}}},Game_Battler[_0x191967(0x29e)][_0x191967(0x3b4)]=function(_0x22fd19){const _0x4b11e7=_0x191967;if(this[_0x4b11e7(0x270)]||this[_0x4b11e7(0x43e)])return;try{if('LeTxJ'!==_0x4b11e7(0x25a))VisuMZ[_0x4b11e7(0x394)][_0x4b11e7(0x276)][_0x4b11e7(0x273)]['onExpireStateJS'][_0x4b11e7(0x344)](this,_0x22fd19);else{function _0x1906de(){const _0x204275=_0x4b11e7;return _0xb3a865[_0x204275(0x394)][_0x204275(0x276)][_0x204275(0x23a)][_0x204275(0x3fe)];}}}catch(_0x1877f1){if($gameTemp[_0x4b11e7(0x2bc)]())console[_0x4b11e7(0x28d)](_0x1877f1);}},Game_Battler[_0x191967(0x29e)]['statesByCategory']=function(_0x2c7e22){const _0x4b71b7=_0x191967;return _0x2c7e22=_0x2c7e22['toUpperCase']()[_0x4b71b7(0x464)](),this['states']()['filter'](_0xbc91d8=>_0xbc91d8['categories']['includes'](_0x2c7e22));},Game_Battler[_0x191967(0x29e)][_0x191967(0x44f)]=function(_0x25fb4b,_0x23ebef){const _0x3b5f6c=_0x191967;_0x25fb4b=_0x25fb4b[_0x3b5f6c(0x412)]()[_0x3b5f6c(0x464)](),_0x23ebef=_0x23ebef||0x0;const _0x2bccc7=this[_0x3b5f6c(0x4af)](_0x25fb4b),_0x3eb9c1=[];for(const _0x4b0d02 of _0x2bccc7){if(!_0x4b0d02)continue;if(_0x23ebef<=0x0)return;_0x3eb9c1[_0x3b5f6c(0x437)](_0x4b0d02['id']),this[_0x3b5f6c(0x297)][_0x3b5f6c(0x429)]=!![],_0x23ebef--;}while(_0x3eb9c1[_0x3b5f6c(0x2a7)]>0x0){if(_0x3b5f6c(0x3a5)===_0x3b5f6c(0x3a5))this[_0x3b5f6c(0x3a3)](_0x3eb9c1['shift']());else{function _0x1196a6(){const _0x264c55=_0x3b5f6c;if(this[_0x264c55(0x270)]||this[_0x264c55(0x43e)])return;try{_0x53d8d1['SkillsStatesCore'][_0x264c55(0x276)]['States']['onEraseStateJS'][_0x264c55(0x344)](this,_0x15a21c);}catch(_0x509be5){if(_0x1d2aa2[_0x264c55(0x2bc)]())_0x4eb41f[_0x264c55(0x28d)](_0x509be5);}}}}},Game_Battler[_0x191967(0x29e)][_0x191967(0x4cd)]=function(_0x31fc4f){const _0x205a5b=_0x191967;_0x31fc4f=_0x31fc4f[_0x205a5b(0x412)]()[_0x205a5b(0x464)]();const _0x3be910=this[_0x205a5b(0x4af)](_0x31fc4f),_0x161698=[];for(const _0x352e5f of _0x3be910){if(!_0x352e5f)continue;_0x161698['push'](_0x352e5f['id']),this[_0x205a5b(0x297)][_0x205a5b(0x429)]=!![];}while(_0x161698['length']>0x0){if(_0x205a5b(0x493)===_0x205a5b(0x493))this[_0x205a5b(0x3a3)](_0x161698['shift']());else{function _0x597b3a(){const _0x13c5da=_0x205a5b,_0x1b919b=_0x20fb82[_0x13c5da(0x1fd)];if(![_0x56f62e,_0x33955c][_0x13c5da(0x398)](_0x1b919b[_0x13c5da(0x4ed)]))return _0x5c4b88[_0x13c5da(0x202)]();}}}},Game_Battler[_0x191967(0x29e)][_0x191967(0x4ba)]=function(_0x8a18d9){const _0x13c2c3=_0x191967;return this[_0x13c2c3(0x4db)](_0x8a18d9)>0x0;},Game_Battler[_0x191967(0x29e)][_0x191967(0x4b1)]=function(_0x527976){const _0x2ad92e=_0x191967;return this[_0x2ad92e(0x4ce)](_0x527976)>0x0;},Game_Battler[_0x191967(0x29e)][_0x191967(0x4db)]=function(_0x8a2e1f){const _0x5a22a1=_0x191967,_0xf6fc97=this[_0x5a22a1(0x4af)](_0x8a2e1f)[_0x5a22a1(0x3b2)](_0xb259a=>this[_0x5a22a1(0x23c)](_0xb259a['id']));return _0xf6fc97[_0x5a22a1(0x2a7)];},Game_Battler[_0x191967(0x29e)][_0x191967(0x4ce)]=function(_0x1fddad){const _0x342109=_0x191967,_0x433398=this['statesByCategory'](_0x1fddad);return _0x433398[_0x342109(0x2a7)];},VisuMZ[_0x191967(0x394)][_0x191967(0x222)]=Game_Battler[_0x191967(0x29e)]['addBuff'],Game_Battler[_0x191967(0x29e)]['addBuff']=function(_0x2865db,_0x56af7d){const _0x54334b=_0x191967;VisuMZ[_0x54334b(0x394)][_0x54334b(0x222)][_0x54334b(0x344)](this,_0x2865db,_0x56af7d);if(this['isBuffAffected'](_0x2865db)){if(_0x54334b(0x2b2)==='dpLtQ'){function _0x34db2d(){const _0x2e1223=_0x54334b,_0x1896c4=_0x1b01bb[_0x2e1223(0x320)]('['+_0x4cd238['$1'][_0x2e1223(0x42d)](/\d+/g)+']');for(const _0x3976c5 of _0x1896c4){if(this[_0x2e1223(0x37c)][_0x2e1223(0x391)](_0x3976c5))return!![];}return![];}}else this[_0x54334b(0x40e)](_0x2865db,_0x56af7d);}},Game_Battler[_0x191967(0x29e)][_0x191967(0x4ae)]=function(_0x3bf50b){},VisuMZ[_0x191967(0x394)][_0x191967(0x24e)]=Game_Battler[_0x191967(0x29e)][_0x191967(0x433)],Game_Battler['prototype'][_0x191967(0x433)]=function(_0x57eb81,_0x17d504){const _0x4ced26=_0x191967;VisuMZ[_0x4ced26(0x394)][_0x4ced26(0x24e)][_0x4ced26(0x344)](this,_0x57eb81,_0x17d504),this[_0x4ced26(0x2ab)](_0x57eb81)&&this[_0x4ced26(0x4e3)](_0x57eb81,_0x17d504);},Game_Battler[_0x191967(0x29e)][_0x191967(0x201)]=function(){const _0x408941=_0x191967;for(let _0x5e5508=0x0;_0x5e5508<this[_0x408941(0x49a)]();_0x5e5508++){if(this[_0x408941(0x34a)](_0x5e5508)){if('Bgsos'!==_0x408941(0x31a)){const _0x33816c=this[_0x408941(0x482)][_0x5e5508];this[_0x408941(0x230)](_0x5e5508);if(_0x33816c>0x0)this[_0x408941(0x2e4)](_0x5e5508);if(_0x33816c<0x0)this['onExpireDebuff'](_0x5e5508);}else{function _0x146b2a(){const _0x176551=_0x408941;for(const _0x4b1752 of this[_0x176551(0x451)]()){this[_0x176551(0x374)](_0x4b1752['id'])&&_0x4b1752[_0x176551(0x4e9)]===_0x558b9f&&(this[_0x176551(0x3a3)](_0x4b1752['id']),this[_0x176551(0x316)](_0x4b1752['id']),this[_0x176551(0x3b4)](_0x4b1752['id']));}}}}}},Game_Battler['prototype'][_0x191967(0x40e)]=function(_0x12f8ad,_0x43f376){const _0x31cff8=_0x191967;this[_0x31cff8(0x208)](_0x12f8ad,_0x43f376);},Game_Battler[_0x191967(0x29e)][_0x191967(0x4e3)]=function(_0x1c4ce1,_0x34857e){const _0x47b3b8=_0x191967;this[_0x47b3b8(0x3ea)](_0x1c4ce1,_0x34857e);},Game_Battler[_0x191967(0x29e)][_0x191967(0x3d0)]=function(_0x1aca1b){const _0x3727dd=_0x191967;Game_BattlerBase[_0x3727dd(0x29e)][_0x3727dd(0x3d0)]['call'](this,_0x1aca1b),this['onEraseBuffGlobalJS'](_0x1aca1b);},Game_Battler['prototype'][_0x191967(0x2b4)]=function(_0xbfe1cb){const _0x136895=_0x191967;Game_BattlerBase[_0x136895(0x29e)][_0x136895(0x2b4)]['call'](this,_0xbfe1cb),this['onEraseDebuffGlobalJS'](_0xbfe1cb);},Game_Battler[_0x191967(0x29e)]['onExpireBuff']=function(_0x1fef2b){const _0x363bd0=_0x191967;this[_0x363bd0(0x47b)](_0x1fef2b);},Game_Battler['prototype'][_0x191967(0x39c)]=function(_0x293163){const _0x36fe1f=_0x191967;this[_0x36fe1f(0x226)](_0x293163);},Game_Battler[_0x191967(0x29e)][_0x191967(0x208)]=function(_0x2d8356,_0x219f9c){const _0x1c9ffa=_0x191967;VisuMZ[_0x1c9ffa(0x394)][_0x1c9ffa(0x276)][_0x1c9ffa(0x317)][_0x1c9ffa(0x29c)]['call'](this,_0x2d8356,_0x219f9c);},Game_Battler[_0x191967(0x29e)][_0x191967(0x3ea)]=function(_0xdc8451,_0x181461){const _0x566f98=_0x191967;VisuMZ[_0x566f98(0x394)][_0x566f98(0x276)][_0x566f98(0x317)][_0x566f98(0x417)]['call'](this,_0xdc8451,_0x181461);},Game_BattlerBase['prototype'][_0x191967(0x262)]=function(_0x5f3351){const _0x98bc5c=_0x191967;VisuMZ[_0x98bc5c(0x394)][_0x98bc5c(0x276)][_0x98bc5c(0x317)][_0x98bc5c(0x3ab)][_0x98bc5c(0x344)](this,_0x5f3351);},Game_BattlerBase[_0x191967(0x29e)][_0x191967(0x35f)]=function(_0x227613){const _0x293e59=_0x191967;VisuMZ['SkillsStatesCore'][_0x293e59(0x276)]['Buffs']['onEraseDebuffJS'][_0x293e59(0x344)](this,_0x227613);},Game_Battler[_0x191967(0x29e)]['onExpireBuffGlobalJS']=function(_0x945f96){const _0xcdaea8=_0x191967;VisuMZ[_0xcdaea8(0x394)][_0xcdaea8(0x276)][_0xcdaea8(0x317)][_0xcdaea8(0x419)][_0xcdaea8(0x344)](this,_0x945f96);},Game_Battler[_0x191967(0x29e)]['onExpireDebuffGlobalJS']=function(_0x90fae1){const _0x577a02=_0x191967;VisuMZ[_0x577a02(0x394)][_0x577a02(0x276)][_0x577a02(0x317)][_0x577a02(0x38c)][_0x577a02(0x344)](this,_0x90fae1);},Game_Battler[_0x191967(0x29e)][_0x191967(0x4de)]=function(_0x72225d){const _0x8ca47d=_0x191967,_0x5380d5=VisuMZ['SkillsStatesCore'],_0x3ef01f=[_0x8ca47d(0x252),'stateHpSlipHealJS','stateMpSlipDamageJS',_0x8ca47d(0x388),_0x8ca47d(0x308),_0x8ca47d(0x4ee)];for(const _0x37ab3e of _0x3ef01f){_0x5380d5[_0x37ab3e][_0x72225d]&&_0x5380d5[_0x37ab3e][_0x72225d][_0x8ca47d(0x344)](this,_0x72225d);}},VisuMZ[_0x191967(0x394)][_0x191967(0x349)]=Game_Battler[_0x191967(0x29e)][_0x191967(0x329)],Game_Battler[_0x191967(0x29e)][_0x191967(0x329)]=function(){const _0x12d149=_0x191967;this['recalculateSlipDamageJS'](),VisuMZ['SkillsStatesCore'][_0x12d149(0x349)][_0x12d149(0x344)](this),this['setPassiveStateSlipDamageJS'](),this['regenerateAllSkillsStatesCore']();},Game_Battler[_0x191967(0x29e)]['setPassiveStateSlipDamageJS']=function(){const _0x209fb6=_0x191967;for(const _0x4f2bac of this[_0x209fb6(0x406)]()){if(_0x209fb6(0x45f)!=='qhBYJ'){if(!_0x4f2bac)continue;this[_0x209fb6(0x4de)](_0x4f2bac['id']);}else{function _0x140c54(){const _0x5f15f1=_0x209fb6;_0x45a6bb['width']-=this[_0x5f15f1(0x336)]();}}}},Game_Battler['prototype']['recalculateSlipDamageJS']=function(){const _0x435d63=_0x191967;for(const _0x30e790 of this[_0x435d63(0x451)]()){if(!_0x30e790)continue;if(_0x30e790[_0x435d63(0x3d2)][_0x435d63(0x42d)](/<JS SLIP REFRESH>/i)){if(_0x435d63(0x44e)!==_0x435d63(0x44e)){function _0x1f5d83(){const _0x2c2ac8=_0x435d63;for(const _0x283838 of _0x25df03){_0x283838['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x187fed=_0x2efbaf[_0x2c2ac8(0x300)](_0x1c8259(_0x21da37['$1'])['toUpperCase']()),_0x577e3e=_0x27a00e(_0x1cca39['$2']);_0x187fed>=0x0&&(_0x1f6f77[_0x2c2ac8(0x4e1)](_0x187fed,_0x577e3e),this['makeSuccess'](_0x762759));}}}else this[_0x435d63(0x4de)](_0x30e790['id']);}}},Game_Battler['prototype'][_0x191967(0x348)]=function(){const _0x3c29a5=_0x191967;if(!this[_0x3c29a5(0x48a)]())return;const _0x5b85ee=this[_0x3c29a5(0x451)]();for(const _0x1df856 of _0x5b85ee){if(_0x3c29a5(0x244)==='IksFy'){function _0x10bb6a(){const _0x45c896=_0x3c29a5;_0x497dd3[_0x45c896(0x394)][_0x45c896(0x2e0)][_0x45c896(0x344)](this,_0xbf5918);if(!this[_0x45c896(0x27b)](_0xaad837))this[_0x45c896(0x228)](_0x224079);}}else{if(!_0x1df856)continue;this['onRegenerateCustomStateDamageOverTime'](_0x1df856);}}},Game_Battler[_0x191967(0x29e)][_0x191967(0x2ba)]=function(_0x4be03b){const _0x22cf9b=_0x191967,_0x5c0ab7=this[_0x22cf9b(0x250)](_0x4be03b['id'],_0x22cf9b(0x267))||0x0,_0x496e07=-this[_0x22cf9b(0x2e5)](),_0x4a3f47=Math[_0x22cf9b(0x313)](_0x5c0ab7,_0x496e07);if(_0x4a3f47!==0x0)this[_0x22cf9b(0x455)](_0x4a3f47);const _0x5c2c4e=this[_0x22cf9b(0x250)](_0x4be03b['id'],_0x22cf9b(0x47a))||0x0;if(_0x5c2c4e!==0x0)this['gainMp'](_0x5c2c4e);const _0x33eb8a=this['getStateData'](_0x4be03b['id'],_0x22cf9b(0x268))||0x0;if(_0x33eb8a!==0x0)this['gainSilentTp'](_0x33eb8a);},VisuMZ[_0x191967(0x394)][_0x191967(0x4d5)]=Game_Actor[_0x191967(0x29e)][_0x191967(0x33b)],Game_Actor['prototype'][_0x191967(0x33b)]=function(){const _0x50bc19=_0x191967,_0x1936ce=VisuMZ[_0x50bc19(0x394)][_0x50bc19(0x4d5)][_0x50bc19(0x344)](this),_0x491905=VisuMZ[_0x50bc19(0x394)][_0x50bc19(0x276)][_0x50bc19(0x23a)];let _0x3d5db9=_0x491905[_0x50bc19(0x4a4)];return $gameParty['inBattle']()&&(_0x3d5db9=_0x3d5db9['concat'](_0x491905[_0x50bc19(0x473)])),_0x1936ce[_0x50bc19(0x3b2)](_0x202b36=>!_0x3d5db9[_0x50bc19(0x398)](_0x202b36));},Game_Actor[_0x191967(0x29e)][_0x191967(0x4a8)]=function(){const _0x279aba=_0x191967;return this[_0x279aba(0x39f)]()[_0x279aba(0x3b2)](_0x1ad2fb=>this[_0x279aba(0x290)](_0x1ad2fb));},Game_Actor[_0x191967(0x29e)]['isSkillUsableForAutoBattle']=function(_0x325a6e){const _0x1dd90f=_0x191967;if(!this[_0x1dd90f(0x25c)](_0x325a6e))return![];const _0x51d9b0=this['skillTypes'](),_0x1b259e=DataManager[_0x1dd90f(0x3d7)](_0x325a6e),_0x55eab7=_0x51d9b0[_0x1dd90f(0x3b2)](_0x2c00e4=>_0x1b259e['includes'](_0x2c00e4));return _0x55eab7[_0x1dd90f(0x2a7)]>0x0;},Game_Actor[_0x191967(0x29e)]['passiveStateObjects']=function(){const _0x127eb8=_0x191967;let _0x2431f6=[this['actor'](),this[_0x127eb8(0x4c8)]()];_0x2431f6=_0x2431f6[_0x127eb8(0x3aa)](this['equips']()[_0x127eb8(0x3b2)](_0x44c88d=>_0x44c88d));for(const _0x2b2252 of this[_0x127eb8(0x3c4)]){if(_0x127eb8(0x4ea)!==_0x127eb8(0x4ea)){function _0x3346fe(){const _0x2fc4b7=_0x127eb8,_0x221f55=_0x2fc4b7(0x4cb);this[_0x2fc4b7(0x210)]=this['_colorCache']||{};if(this[_0x2fc4b7(0x210)][_0x221f55])return this[_0x2fc4b7(0x210)][_0x221f55];const _0x3c172a=_0x55ee14[_0x2fc4b7(0x394)]['Settings'][_0x2fc4b7(0x317)]['ColorDebuff'];return this[_0x2fc4b7(0x26c)](_0x221f55,_0x3c172a);}}else{const _0xf6a45e=$dataSkills[_0x2b2252];if(_0xf6a45e)_0x2431f6[_0x127eb8(0x437)](_0xf6a45e);}}return _0x2431f6;},Game_Actor[_0x191967(0x29e)][_0x191967(0x296)]=function(){const _0x1c1343=_0x191967;Game_Battler[_0x1c1343(0x29e)][_0x1c1343(0x296)]['call'](this);const _0x4125d9=VisuMZ['SkillsStatesCore'][_0x1c1343(0x276)][_0x1c1343(0x41e)][_0x1c1343(0x2cf)];this[_0x1c1343(0x483)][_0x1c1343(0x406)]=this[_0x1c1343(0x483)][_0x1c1343(0x406)][_0x1c1343(0x3aa)](_0x4125d9);},VisuMZ[_0x191967(0x394)][_0x191967(0x3d1)]=Game_Actor[_0x191967(0x29e)]['learnSkill'],Game_Actor[_0x191967(0x29e)]['learnSkill']=function(_0x1dabd3){const _0x151eda=_0x191967;VisuMZ[_0x151eda(0x394)][_0x151eda(0x3d1)][_0x151eda(0x344)](this,_0x1dabd3),this['_cache']={};},VisuMZ[_0x191967(0x394)][_0x191967(0x38d)]=Game_Actor[_0x191967(0x29e)]['forgetSkill'],Game_Actor[_0x191967(0x29e)][_0x191967(0x3a4)]=function(_0x29f427){const _0x4019b4=_0x191967;VisuMZ[_0x4019b4(0x394)][_0x4019b4(0x38d)][_0x4019b4(0x344)](this,_0x29f427),this['_cache']={};},Game_Enemy[_0x191967(0x29e)][_0x191967(0x439)]=function(){let _0x4613e4=[this['enemy']()];return _0x4613e4['concat'](this['skills']());},Game_Enemy[_0x191967(0x29e)][_0x191967(0x296)]=function(){const _0x2a5712=_0x191967;Game_Battler[_0x2a5712(0x29e)][_0x2a5712(0x296)][_0x2a5712(0x344)](this);const _0x389944=VisuMZ[_0x2a5712(0x394)][_0x2a5712(0x276)][_0x2a5712(0x41e)][_0x2a5712(0x2bb)];this[_0x2a5712(0x483)][_0x2a5712(0x406)]=this[_0x2a5712(0x483)]['passiveStates']['concat'](_0x389944);},Game_Enemy['prototype']['skills']=function(){const _0x3da6c8=_0x191967,_0x3c7c7c=[];for(const _0x36a275 of this[_0x3da6c8(0x475)]()[_0x3da6c8(0x3c9)]){const _0x14840e=$dataSkills[_0x36a275[_0x3da6c8(0x4e6)]];if(_0x14840e&&!_0x3c7c7c[_0x3da6c8(0x398)](_0x14840e))_0x3c7c7c[_0x3da6c8(0x437)](_0x14840e);}return _0x3c7c7c;},Game_Enemy[_0x191967(0x29e)]['meetsStateCondition']=function(_0x43d814){const _0x50b970=_0x191967;return this[_0x50b970(0x395)]($dataStates[_0x43d814]);},VisuMZ['SkillsStatesCore'][_0x191967(0x2de)]=Game_Unit[_0x191967(0x29e)]['isAllDead'],Game_Unit['prototype'][_0x191967(0x497)]=function(){const _0x2003d1=_0x191967;if(this[_0x2003d1(0x36d)]())return!![];return VisuMZ[_0x2003d1(0x394)][_0x2003d1(0x2de)]['call'](this);},Game_Unit[_0x191967(0x29e)][_0x191967(0x36d)]=function(){const _0x2572c5=_0x191967,_0x18850f=this[_0x2572c5(0x20f)]();for(const _0x577cc of _0x18850f){if(!_0x577cc['isGroupDefeatStateAffected']())return![];}return!![];},VisuMZ[_0x191967(0x394)][_0x191967(0x249)]=Game_Troop[_0x191967(0x29e)][_0x191967(0x40b)],Game_Troop[_0x191967(0x29e)][_0x191967(0x40b)]=function(_0x577d8a){const _0x5ca6b2=_0x191967;VisuMZ[_0x5ca6b2(0x394)]['Game_Troop_setup']['call'](this,_0x577d8a),this['makeCurrentTroopUniqueID']();},Game_Troop[_0x191967(0x29e)][_0x191967(0x2d9)]=function(){this['_currentTroopUniqueID']=Graphics['frameCount'];},Game_Troop['prototype']['getCurrentTroopUniqueID']=function(){const _0x2bdc16=_0x191967;return this['_currentTroopUniqueID']=this[_0x2bdc16(0x389)]||Graphics[_0x2bdc16(0x254)],this[_0x2bdc16(0x389)];},Scene_Skill[_0x191967(0x29e)]['isBottomHelpMode']=function(){const _0x4278a3=_0x191967;if(ConfigManager[_0x4278a3(0x281)]&&ConfigManager[_0x4278a3(0x212)]!==undefined)return ConfigManager[_0x4278a3(0x212)];else{if(this[_0x4278a3(0x293)]()){if(_0x4278a3(0x25e)==='mWrPk')return this[_0x4278a3(0x3c8)]()[_0x4278a3(0x42d)](/LOWER/i);else{function _0xdf3996(){const _0x15f2bb=_0x4278a3;this[_0x15f2bb(0x323)][_0x149e8e]='';}}}else Scene_ItemBase[_0x4278a3(0x29e)][_0x4278a3(0x376)]['call'](this);}},Scene_Skill[_0x191967(0x29e)][_0x191967(0x376)]=function(){const _0x438e4e=_0x191967;if(ConfigManager[_0x438e4e(0x281)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x438e4e(0x303)];else{if(this[_0x438e4e(0x293)]()){if('xkxmH'===_0x438e4e(0x4df)){function _0x303a39(){const _0x352da6=_0x438e4e;_0x2c9a76[_0x352da6(0x437)](_0x2131c2[_0x352da6(0x2b6)](_0x563de6));}}else return this[_0x438e4e(0x3c8)]()[_0x438e4e(0x42d)](/RIGHT/i);}else{if('lnTBP'===_0x438e4e(0x4d7)){function _0x14c8ae(){return![];}}else return Scene_ItemBase[_0x438e4e(0x29e)][_0x438e4e(0x376)][_0x438e4e(0x344)](this);}}},Scene_Skill[_0x191967(0x29e)][_0x191967(0x3c8)]=function(){const _0x2b5a4c=_0x191967;return VisuMZ['SkillsStatesCore'][_0x2b5a4c(0x276)]['Skills'][_0x2b5a4c(0x2a1)];},Scene_Skill['prototype'][_0x191967(0x469)]=function(){const _0x493043=_0x191967;return this[_0x493043(0x29a)]&&this[_0x493043(0x29a)]['isUseModernControls']();},Scene_Skill[_0x191967(0x29e)]['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x43311d=_0x191967;return VisuMZ['SkillsStatesCore'][_0x43311d(0x276)][_0x43311d(0x23a)]['EnableLayout'];},VisuMZ['SkillsStatesCore']['Scene_Skill_helpWindowRect']=Scene_Skill[_0x191967(0x29e)][_0x191967(0x33f)],Scene_Skill[_0x191967(0x29e)][_0x191967(0x33f)]=function(){const _0x539cbe=_0x191967;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x539cbe(0x427)]():VisuMZ['SkillsStatesCore'][_0x539cbe(0x35c)][_0x539cbe(0x344)](this);},Scene_Skill[_0x191967(0x29e)]['helpWindowRectSkillsStatesCore']=function(){const _0x4c4dcb=_0x191967,_0x4e8515=0x0,_0x293cd5=this['helpAreaTop'](),_0x2e44e3=Graphics[_0x4c4dcb(0x46b)],_0x3ffc84=this[_0x4c4dcb(0x470)]();return new Rectangle(_0x4e8515,_0x293cd5,_0x2e44e3,_0x3ffc84);},VisuMZ['SkillsStatesCore']['Scene_Skill_skillTypeWindowRect']=Scene_Skill[_0x191967(0x29e)]['skillTypeWindowRect'],Scene_Skill['prototype'][_0x191967(0x2fe)]=function(){const _0x2fb448=_0x191967;return this[_0x2fb448(0x293)]()?this[_0x2fb448(0x289)]():VisuMZ['SkillsStatesCore'][_0x2fb448(0x4bd)][_0x2fb448(0x344)](this);},Scene_Skill[_0x191967(0x29e)][_0x191967(0x289)]=function(){const _0x485658=_0x191967,_0x263e5b=this[_0x485658(0x234)](),_0x209280=this[_0x485658(0x465)](0x3,!![]),_0x5109ae=this['isRightInputMode']()?Graphics[_0x485658(0x46b)]-_0x263e5b:0x0,_0x499c53=this[_0x485658(0x26a)]();return new Rectangle(_0x5109ae,_0x499c53,_0x263e5b,_0x209280);},VisuMZ[_0x191967(0x394)][_0x191967(0x496)]=Scene_Skill[_0x191967(0x29e)][_0x191967(0x3f1)],Scene_Skill[_0x191967(0x29e)][_0x191967(0x3f1)]=function(){const _0xf9f7ae=_0x191967;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0xf9f7ae(0x223)]():VisuMZ[_0xf9f7ae(0x394)][_0xf9f7ae(0x496)][_0xf9f7ae(0x344)](this);},Scene_Skill[_0x191967(0x29e)][_0x191967(0x223)]=function(){const _0x5ab408=_0x191967,_0x328f03=Graphics['boxWidth']-this['mainCommandWidth'](),_0x3d8000=this[_0x5ab408(0x45d)][_0x5ab408(0x24f)],_0x24e6fb=this['isRightInputMode']()?0x0:Graphics[_0x5ab408(0x46b)]-_0x328f03,_0x218b9e=this[_0x5ab408(0x26a)]();return new Rectangle(_0x24e6fb,_0x218b9e,_0x328f03,_0x3d8000);},VisuMZ[_0x191967(0x394)]['Scene_Skill_createItemWindow']=Scene_Skill[_0x191967(0x29e)][_0x191967(0x3fd)],Scene_Skill[_0x191967(0x29e)][_0x191967(0x3fd)]=function(){const _0x3bb2fd=_0x191967;VisuMZ['SkillsStatesCore'][_0x3bb2fd(0x2a0)][_0x3bb2fd(0x344)](this);if(this['allowCreateShopStatusWindow']()){if(_0x3bb2fd(0x4d8)!==_0x3bb2fd(0x392))this[_0x3bb2fd(0x4a6)]();else{function _0x3362e5(){const _0x16b95b=_0x3bb2fd;this[_0x16b95b(0x3e7)](_0x299b53);;}}}},VisuMZ['SkillsStatesCore'][_0x191967(0x2a9)]=Scene_Skill[_0x191967(0x29e)][_0x191967(0x245)],Scene_Skill[_0x191967(0x29e)][_0x191967(0x245)]=function(){const _0x14efa0=_0x191967;if(this[_0x14efa0(0x293)]())return this[_0x14efa0(0x2ca)]();else{if(_0x14efa0(0x4e8)===_0x14efa0(0x2a5)){function _0xbfbde3(){const _0x2cfbaa=_0x14efa0;if(_0x227b15[_0x2cfbaa(0x37b)](_0x1b0627))return!![];}}else{const _0x40820b=VisuMZ[_0x14efa0(0x394)]['Scene_Skill_itemWindowRect'][_0x14efa0(0x344)](this);return this['allowCreateShopStatusWindow']()&&this[_0x14efa0(0x3f7)]()&&(_0x40820b['width']-=this[_0x14efa0(0x336)]()),_0x40820b;}}},Scene_Skill[_0x191967(0x29e)][_0x191967(0x2ca)]=function(){const _0x3ac91e=_0x191967,_0x25a7de=Graphics[_0x3ac91e(0x46b)]-this[_0x3ac91e(0x336)](),_0x6319a1=this['mainAreaHeight']()-this['_statusWindow'][_0x3ac91e(0x24f)],_0x209123=this[_0x3ac91e(0x376)]()?Graphics[_0x3ac91e(0x46b)]-_0x25a7de:0x0,_0x4d0346=this[_0x3ac91e(0x3de)]['y']+this['_statusWindow']['height'];return new Rectangle(_0x209123,_0x4d0346,_0x25a7de,_0x6319a1);},Scene_Skill['prototype'][_0x191967(0x330)]=function(){const _0x1de092=_0x191967;if(!Imported[_0x1de092(0x3e4)])return![];else{if(this[_0x1de092(0x293)]())return!![];else{if(_0x1de092(0x28f)!=='XVWVw')return VisuMZ['SkillsStatesCore']['Settings'][_0x1de092(0x23a)][_0x1de092(0x3f3)];else{function _0x404b58(){const _0x1d19cb=_0x1de092;_0x19daa1[_0x1d19cb(0x4a5)](_0x27de1e,_0x11c9fc),this['makeSuccess'](_0x4c09f0);}}}}},Scene_Skill[_0x191967(0x29e)]['adjustItemWidthByShopStatus']=function(){const _0x55c0fb=_0x191967;return VisuMZ[_0x55c0fb(0x394)][_0x55c0fb(0x276)][_0x55c0fb(0x23a)][_0x55c0fb(0x3fe)];},Scene_Skill[_0x191967(0x29e)]['createShopStatusWindow']=function(){const _0x1291ff=_0x191967,_0x3228e7=this[_0x1291ff(0x236)]();this[_0x1291ff(0x26b)]=new Window_ShopStatus(_0x3228e7),this[_0x1291ff(0x325)](this['_shopStatusWindow']),this['_itemWindow']['setStatusWindow'](this[_0x1291ff(0x26b)]);const _0x574919=VisuMZ[_0x1291ff(0x394)][_0x1291ff(0x276)][_0x1291ff(0x23a)][_0x1291ff(0x4c1)];this[_0x1291ff(0x26b)]['setBackgroundType'](_0x574919||0x0);},Scene_Skill[_0x191967(0x29e)][_0x191967(0x236)]=function(){const _0x39ccfd=_0x191967;return this[_0x39ccfd(0x293)]()?this['shopStatusWindowRectSkillsStatesCore']():VisuMZ[_0x39ccfd(0x394)]['Settings']['Skills'][_0x39ccfd(0x43d)][_0x39ccfd(0x344)](this);},Scene_Skill['prototype'][_0x191967(0x27e)]=function(){const _0x7790a6=_0x191967,_0x537d2c=this[_0x7790a6(0x336)](),_0x46e19f=this[_0x7790a6(0x227)]['height'],_0x303942=this[_0x7790a6(0x376)]()?0x0:Graphics[_0x7790a6(0x46b)]-this[_0x7790a6(0x336)](),_0x37f8da=this['_itemWindow']['y'];return new Rectangle(_0x303942,_0x37f8da,_0x537d2c,_0x46e19f);},Scene_Skill[_0x191967(0x29e)][_0x191967(0x336)]=function(){const _0x21e395=_0x191967;if(Imported[_0x21e395(0x3e4)]){if('nQuKL'!==_0x21e395(0x4a1))return Scene_Shop['prototype'][_0x21e395(0x288)]();else{function _0x38c622(){const _0x52d9fe=_0x21e395;this[_0x52d9fe(0x4a6)]();}}}else return 0x0;},Scene_Skill[_0x191967(0x29e)][_0x191967(0x343)]=function(){const _0x22708f=_0x191967;if(this['_skillTypeWindow']&&this[_0x22708f(0x45d)]['active'])return TextManager['buttonAssistSwitch'];else{if(_0x22708f(0x206)==='VstSn'){function _0x5931ab(){const _0x38d686=_0x22708f,_0x2629cd=this[_0x38d686(0x40f)];_0x2629cd['drawText'](_0x4310f7,0x0,_0x1cb521['y'],_0x2629cd['innerWidth'],_0x38d686(0x224));}}else return'';}},VisuMZ[_0x191967(0x394)][_0x191967(0x358)]=Sprite_Gauge[_0x191967(0x29e)]['initMembers'],Sprite_Gauge[_0x191967(0x29e)][_0x191967(0x35d)]=function(){const _0x5b43e3=_0x191967;VisuMZ[_0x5b43e3(0x394)]['Sprite_Gauge_initMembers'][_0x5b43e3(0x344)](this),this[_0x5b43e3(0x462)]=null;},VisuMZ[_0x191967(0x394)]['Sprite_Gauge_setup']=Sprite_Gauge['prototype'][_0x191967(0x40b)],Sprite_Gauge[_0x191967(0x29e)][_0x191967(0x40b)]=function(_0x4b9c37,_0xba1778){const _0x8c52fc=_0x191967;this[_0x8c52fc(0x484)](_0x4b9c37,_0xba1778),_0xba1778=_0xba1778[_0x8c52fc(0x26f)](),VisuMZ['SkillsStatesCore'][_0x8c52fc(0x265)][_0x8c52fc(0x344)](this,_0x4b9c37,_0xba1778);},Sprite_Gauge['prototype'][_0x191967(0x484)]=function(_0x170a6f,_0x3967aa){const _0x349da9=_0x191967,_0x492421=VisuMZ[_0x349da9(0x394)][_0x349da9(0x276)][_0x349da9(0x480)][_0x349da9(0x3b2)](_0x2b0aad=>_0x2b0aad[_0x349da9(0x24a)][_0x349da9(0x412)]()===_0x3967aa[_0x349da9(0x412)]());if(_0x492421[_0x349da9(0x2a7)]>=0x1){if('RpYCP'==='RpYCP')this['_costSettings']=_0x492421[0x0];else{function _0x7c8f77(){const _0x58bc4e=_0x349da9,_0x166a69=this[_0x58bc4e(0x236)]();this['_shopStatusWindow']=new _0x4f8336(_0x166a69),this[_0x58bc4e(0x325)](this[_0x58bc4e(0x26b)]),this['_itemWindow'][_0x58bc4e(0x29f)](this['_shopStatusWindow']);const _0x35ec71=_0xa915a6[_0x58bc4e(0x394)][_0x58bc4e(0x276)][_0x58bc4e(0x23a)][_0x58bc4e(0x4c1)];this[_0x58bc4e(0x26b)][_0x58bc4e(0x37e)](_0x35ec71||0x0);}}}else this[_0x349da9(0x462)]=null;},VisuMZ['SkillsStatesCore'][_0x191967(0x383)]=Sprite_Gauge[_0x191967(0x29e)][_0x191967(0x424)],Sprite_Gauge['prototype'][_0x191967(0x424)]=function(){const _0x5a4b30=_0x191967;return this[_0x5a4b30(0x385)]&&this[_0x5a4b30(0x462)]?this['currentValueSkillsStatesCore']():VisuMZ[_0x5a4b30(0x394)][_0x5a4b30(0x383)][_0x5a4b30(0x344)](this);},Sprite_Gauge[_0x191967(0x29e)][_0x191967(0x239)]=function(){const _0x235821=_0x191967;return this[_0x235821(0x462)][_0x235821(0x2fa)][_0x235821(0x344)](this[_0x235821(0x385)]);},VisuMZ['SkillsStatesCore'][_0x191967(0x38a)]=Sprite_Gauge[_0x191967(0x29e)][_0x191967(0x416)],Sprite_Gauge['prototype'][_0x191967(0x416)]=function(){const _0x55be25=_0x191967;if(this[_0x55be25(0x385)]&&this[_0x55be25(0x462)]){if('lhpgw'!==_0x55be25(0x29b))return this['currentMaxValueSkillsStatesCore']();else{function _0x33455a(){if(!_0x1adf20['value'](_0x54ce88))return![];}}}else{if('Pdeaz'!==_0x55be25(0x2ae))return VisuMZ[_0x55be25(0x394)]['Sprite_Gauge_currentMaxValue'][_0x55be25(0x344)](this);else{function _0x39ebbb(){const _0x375b06=_0x55be25;this[_0x375b06(0x2c3)]=this[_0x375b06(0x2c3)]||{};const _0x16bf51=_0x4547eb?this[_0x375b06(0x21b)](_0x4b1ff5):this[_0x375b06(0x341)]();this['_stateOrigin'][_0xf793e8]=_0x16bf51;}}}},Sprite_Gauge[_0x191967(0x29e)][_0x191967(0x304)]=function(){const _0x515d3b=_0x191967;return this['_costSettings'][_0x515d3b(0x4be)][_0x515d3b(0x344)](this[_0x515d3b(0x385)]);},VisuMZ[_0x191967(0x394)][_0x191967(0x2c9)]=Sprite_Gauge[_0x191967(0x29e)]['gaugeRate'],Sprite_Gauge[_0x191967(0x29e)]['gaugeRate']=function(){const _0x39ecc7=_0x191967,_0x52508d=VisuMZ[_0x39ecc7(0x394)][_0x39ecc7(0x2c9)][_0x39ecc7(0x344)](this);return _0x52508d[_0x39ecc7(0x3a7)](0x0,0x1);},VisuMZ[_0x191967(0x394)][_0x191967(0x49b)]=Sprite_Gauge[_0x191967(0x29e)][_0x191967(0x49c)],Sprite_Gauge[_0x191967(0x29e)][_0x191967(0x49c)]=function(){const _0x1e640c=_0x191967;this['_battler']&&this[_0x1e640c(0x462)]?(this[_0x1e640c(0x294)]['clear'](),this[_0x1e640c(0x314)]()):VisuMZ[_0x1e640c(0x394)][_0x1e640c(0x49b)]['call'](this);},Sprite_Gauge[_0x191967(0x29e)][_0x191967(0x30d)]=function(){const _0x2a8d1c=_0x191967;let _0x466e55=this['currentValue']();return Imported[_0x2a8d1c(0x242)]&&this[_0x2a8d1c(0x3d3)]()&&(_0x466e55=VisuMZ[_0x2a8d1c(0x339)](_0x466e55)),_0x466e55;},Sprite_Gauge['prototype'][_0x191967(0x314)]=function(){const _0x1dc3de=_0x191967;this[_0x1dc3de(0x462)][_0x1dc3de(0x2f2)][_0x1dc3de(0x344)](this);},Sprite_Gauge[_0x191967(0x29e)][_0x191967(0x2e1)]=function(_0x58f2b6,_0x5c7043,_0x3edfb9,_0x5eda45,_0x5808f2,_0x586d47){const _0x270e2c=_0x191967,_0x1044ca=this['gaugeRate'](),_0x512afc=Math[_0x270e2c(0x2ce)]((_0x5808f2-0x2)*_0x1044ca),_0x5aa8b2=_0x586d47-0x2,_0xda5545=this[_0x270e2c(0x2d8)]();this[_0x270e2c(0x294)][_0x270e2c(0x384)](_0x3edfb9,_0x5eda45,_0x5808f2,_0x586d47,_0xda5545),this['bitmap'][_0x270e2c(0x486)](_0x3edfb9+0x1,_0x5eda45+0x1,_0x512afc,_0x5aa8b2,_0x58f2b6,_0x5c7043);},VisuMZ[_0x191967(0x394)][_0x191967(0x399)]=Sprite_StateIcon[_0x191967(0x29e)][_0x191967(0x3b8)],Sprite_StateIcon[_0x191967(0x29e)][_0x191967(0x3b8)]=function(){const _0x9002e9=_0x191967;VisuMZ[_0x9002e9(0x394)][_0x9002e9(0x399)][_0x9002e9(0x344)](this),this['createTurnDisplaySprite']();},Sprite_StateIcon['prototype'][_0x191967(0x48f)]=function(){const _0x1ae95b=_0x191967,_0x3c32ba=Window_Base['prototype']['lineHeight']();this[_0x1ae95b(0x39e)]=new Sprite(),this[_0x1ae95b(0x39e)][_0x1ae95b(0x294)]=new Bitmap(ImageManager[_0x1ae95b(0x3d9)],_0x3c32ba),this[_0x1ae95b(0x39e)][_0x1ae95b(0x2d0)]['x']=this[_0x1ae95b(0x2d0)]['x'],this['_turnDisplaySprite'][_0x1ae95b(0x2d0)]['y']=this[_0x1ae95b(0x2d0)]['y'],this[_0x1ae95b(0x24c)](this[_0x1ae95b(0x39e)]),this['contents']=this['_turnDisplaySprite'][_0x1ae95b(0x294)];},VisuMZ[_0x191967(0x394)][_0x191967(0x327)]=Sprite_StateIcon['prototype'][_0x191967(0x36a)],Sprite_StateIcon['prototype'][_0x191967(0x36a)]=function(){const _0x39dfb0=_0x191967;VisuMZ[_0x39dfb0(0x394)][_0x39dfb0(0x327)]['call'](this),this[_0x39dfb0(0x421)]();},Sprite_StateIcon[_0x191967(0x29e)][_0x191967(0x2fc)]=function(_0x560bcf,_0x380fd1,_0x222666,_0x2eb077,_0x5b0339){const _0x36f0eb=_0x191967;this['contents'][_0x36f0eb(0x2fc)](_0x560bcf,_0x380fd1,_0x222666,_0x2eb077,this[_0x36f0eb(0x225)][_0x36f0eb(0x24f)],_0x5b0339);},Sprite_StateIcon[_0x191967(0x29e)]['updateTurnDisplaySprite']=function(){const _0x6ef461=_0x191967;this[_0x6ef461(0x22c)](),this['contents'][_0x6ef461(0x46a)]();const _0x41e711=this[_0x6ef461(0x385)];if(!_0x41e711)return;const _0x2f3460=_0x41e711[_0x6ef461(0x451)]()[_0x6ef461(0x3b2)](_0x2c145c=>_0x2c145c['iconIndex']>0x0),_0x3e5994=[...Array(0x8)[_0x6ef461(0x31d)]()][_0x6ef461(0x3b2)](_0x2b5eba=>_0x41e711[_0x6ef461(0x3cd)](_0x2b5eba)!==0x0),_0x3c6892=this[_0x6ef461(0x481)],_0x5b299b=_0x2f3460[_0x3c6892];if(_0x5b299b)Window_Base[_0x6ef461(0x29e)][_0x6ef461(0x372)]['call'](this,_0x41e711,_0x5b299b,0x0,0x0),Window_Base[_0x6ef461(0x29e)]['drawActorStateData'][_0x6ef461(0x344)](this,_0x41e711,_0x5b299b,0x0,0x0);else{const _0xdfecb6=_0x3e5994[_0x3c6892-_0x2f3460[_0x6ef461(0x2a7)]];if(_0xdfecb6===undefined)return;Window_Base['prototype'][_0x6ef461(0x3a9)][_0x6ef461(0x344)](this,_0x41e711,_0xdfecb6,0x0,0x0),Window_Base[_0x6ef461(0x29e)]['drawActorBuffRates']['call'](this,_0x41e711,_0xdfecb6,0x0,0x0);}},Sprite_StateIcon[_0x191967(0x29e)][_0x191967(0x22c)]=function(){const _0x244904=_0x191967;this[_0x244904(0x225)]['fontFace']=$gameSystem['mainFontFace'](),this['contents'][_0x244904(0x420)]=$gameSystem[_0x244904(0x2da)](),this['resetTextColor']();},Sprite_StateIcon[_0x191967(0x29e)][_0x191967(0x23b)]=function(){const _0x387221=_0x191967;this[_0x387221(0x32f)](ColorManager[_0x387221(0x24b)]()),this[_0x387221(0x32b)](ColorManager[_0x387221(0x2c2)]());},Sprite_StateIcon[_0x191967(0x29e)][_0x191967(0x32f)]=function(_0x45a109){const _0x1932b6=_0x191967;this['contents'][_0x1932b6(0x3e9)]=_0x45a109;},Sprite_StateIcon[_0x191967(0x29e)][_0x191967(0x32b)]=function(_0x59983b){const _0x388b61=_0x191967;this[_0x388b61(0x225)][_0x388b61(0x2c2)]=_0x59983b;},Sprite_StateIcon[_0x191967(0x29e)]['hide']=function(){const _0x422fc6=_0x191967;this[_0x422fc6(0x47c)]=!![],this[_0x422fc6(0x386)]();},Window_Base['prototype']['drawSkillCost']=function(_0x3f63a6,_0x30b3e0,_0x59411c,_0x1b372e,_0x568994){const _0x3787ec=_0x191967,_0x4dd158=this[_0x3787ec(0x2c6)](_0x3f63a6,_0x30b3e0),_0x3639f0=this[_0x3787ec(0x26d)](_0x4dd158,_0x59411c,_0x1b372e,_0x568994),_0x297811=_0x59411c+_0x568994-_0x3639f0[_0x3787ec(0x4c9)];this[_0x3787ec(0x37a)](_0x4dd158,_0x297811,_0x1b372e,_0x568994),this[_0x3787ec(0x22c)]();},Window_Base[_0x191967(0x29e)][_0x191967(0x2c6)]=function(_0x4d66e6,_0x324c01){const _0x19031e=_0x191967;let _0x39a5ed='';for(settings of VisuMZ[_0x19031e(0x394)][_0x19031e(0x276)][_0x19031e(0x480)]){if(_0x19031e(0x440)===_0x19031e(0x407)){function _0x57d25a(){return _0x18af18;}}else{if(!this[_0x19031e(0x373)](_0x4d66e6,_0x324c01,settings))continue;if(_0x39a5ed[_0x19031e(0x2a7)]>0x0)_0x39a5ed+=this[_0x19031e(0x277)]();_0x39a5ed+=this[_0x19031e(0x21e)](_0x4d66e6,_0x324c01,settings);}}_0x39a5ed=this[_0x19031e(0x334)](_0x4d66e6,_0x324c01,_0x39a5ed);if(_0x324c01[_0x19031e(0x3d2)]['match'](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x39a5ed[_0x19031e(0x2a7)]>0x0)_0x39a5ed+=this[_0x19031e(0x277)]();_0x39a5ed+=String(RegExp['$1']);}return _0x39a5ed;},Window_Base[_0x191967(0x29e)][_0x191967(0x334)]=function(_0xe788b2,_0x122017,_0x4181ff){return _0x4181ff;},Window_Base[_0x191967(0x29e)][_0x191967(0x373)]=function(_0x7d9f51,_0x438214,_0x3c892c){const _0x4d5d08=_0x191967,_0x57237a=_0x3c892c[_0x4d5d08(0x35b)][_0x4d5d08(0x344)](_0x7d9f51,_0x438214);return _0x3c892c[_0x4d5d08(0x21f)][_0x4d5d08(0x344)](_0x7d9f51,_0x438214,_0x57237a,_0x3c892c);},Window_Base[_0x191967(0x29e)]['createSkillCostText']=function(_0x130487,_0x3e1e5d,_0x7fc622){const _0x46e754=_0x191967,_0x5e78f0=_0x7fc622[_0x46e754(0x35b)][_0x46e754(0x344)](_0x130487,_0x3e1e5d);return _0x7fc622[_0x46e754(0x4b0)][_0x46e754(0x344)](_0x130487,_0x3e1e5d,_0x5e78f0,_0x7fc622);},Window_Base[_0x191967(0x29e)][_0x191967(0x277)]=function(){return'\x20';},Window_Base[_0x191967(0x29e)]['drawActorIcons']=function(_0x1fc8af,_0x562a09,_0x1d3744,_0x1178bf){const _0x20b00e=_0x191967;if(!_0x1fc8af)return;VisuMZ['SkillsStatesCore'][_0x20b00e(0x1f6)][_0x20b00e(0x344)](this,_0x1fc8af,_0x562a09,_0x1d3744,_0x1178bf),this['drawActorIconsAllTurnCounters'](_0x1fc8af,_0x562a09,_0x1d3744,_0x1178bf);},Window_Base['prototype'][_0x191967(0x2c1)]=function(_0x53189f,_0x2575fb,_0x58d781,_0x3f3ee9){const _0xb12fa5=_0x191967;_0x3f3ee9=_0x3f3ee9||0x90;const _0x1efc15=ImageManager['iconWidth'],_0x381eab=_0x53189f['allIcons']()[_0xb12fa5(0x3c5)](0x0,Math[_0xb12fa5(0x2ce)](_0x3f3ee9/_0x1efc15)),_0x2ade4d=_0x53189f[_0xb12fa5(0x451)]()[_0xb12fa5(0x3b2)](_0x313738=>_0x313738[_0xb12fa5(0x3d6)]>0x0),_0x1eeffd=[...Array(0x8)['keys']()][_0xb12fa5(0x3b2)](_0x5ed6ed=>_0x53189f[_0xb12fa5(0x3cd)](_0x5ed6ed)!==0x0),_0x5837a0=[];let _0x13d73e=_0x2575fb;for(let _0x4d9f83=0x0;_0x4d9f83<_0x381eab['length'];_0x4d9f83++){this['resetFontSettings']();const _0x920aff=_0x2ade4d[_0x4d9f83];if(_0x920aff)!_0x5837a0[_0xb12fa5(0x398)](_0x920aff)&&this[_0xb12fa5(0x372)](_0x53189f,_0x920aff,_0x13d73e,_0x58d781),this[_0xb12fa5(0x246)](_0x53189f,_0x920aff,_0x13d73e,_0x58d781),_0x5837a0[_0xb12fa5(0x437)](_0x920aff);else{const _0x6ee247=_0x1eeffd[_0x4d9f83-_0x2ade4d[_0xb12fa5(0x2a7)]];this[_0xb12fa5(0x3a9)](_0x53189f,_0x6ee247,_0x13d73e,_0x58d781),this[_0xb12fa5(0x449)](_0x53189f,_0x6ee247,_0x13d73e,_0x58d781);}_0x13d73e+=_0x1efc15;}},Window_Base[_0x191967(0x29e)]['drawActorStateTurns']=function(_0x3ebcb1,_0x27c016,_0x3322b4,_0x2379db){const _0x598833=_0x191967;if(!VisuMZ[_0x598833(0x394)][_0x598833(0x276)][_0x598833(0x273)][_0x598833(0x4b3)])return;if(!_0x3ebcb1[_0x598833(0x23c)](_0x27c016['id']))return;if(_0x27c016[_0x598833(0x4e9)]===0x0)return;if(_0x27c016[_0x598833(0x3d2)][_0x598833(0x42d)](/<HIDE STATE TURNS>/i))return;const _0x350aee=_0x3ebcb1['stateTurns'](_0x27c016['id']),_0x3f9f82=ImageManager[_0x598833(0x3d9)],_0x5e9e4d=ColorManager[_0x598833(0x30f)](_0x27c016);this['changeTextColor'](_0x5e9e4d),this[_0x598833(0x32b)](_0x598833(0x360)),this[_0x598833(0x225)][_0x598833(0x48e)]=!![],this['contents']['fontSize']=VisuMZ[_0x598833(0x394)]['Settings'][_0x598833(0x273)]['TurnFontSize'],_0x3322b4+=VisuMZ[_0x598833(0x394)][_0x598833(0x276)][_0x598833(0x273)][_0x598833(0x31b)],_0x2379db+=VisuMZ[_0x598833(0x394)][_0x598833(0x276)][_0x598833(0x273)][_0x598833(0x269)],this[_0x598833(0x2fc)](_0x350aee,_0x3322b4,_0x2379db,_0x3f9f82,_0x598833(0x45e)),this[_0x598833(0x225)][_0x598833(0x48e)]=![],this['resetFontSettings']();},Window_Base[_0x191967(0x29e)]['drawActorStateData']=function(_0x39bd37,_0x4e5fd3,_0x463b3b,_0x483eb3){const _0x178b34=_0x191967;if(!VisuMZ['SkillsStatesCore'][_0x178b34(0x276)][_0x178b34(0x273)][_0x178b34(0x2bf)])return;const _0x2b26b2=ImageManager['iconWidth'],_0x5cea5e=ImageManager[_0x178b34(0x3ba)]/0x2,_0x1f3d4a=ColorManager[_0x178b34(0x24b)]();this[_0x178b34(0x32f)](_0x1f3d4a),this['changeOutlineColor'](_0x178b34(0x360)),this[_0x178b34(0x225)][_0x178b34(0x48e)]=!![],this[_0x178b34(0x225)][_0x178b34(0x420)]=VisuMZ[_0x178b34(0x394)][_0x178b34(0x276)][_0x178b34(0x273)][_0x178b34(0x2f5)],_0x463b3b+=VisuMZ[_0x178b34(0x394)][_0x178b34(0x276)][_0x178b34(0x273)]['DataOffsetX'],_0x483eb3+=VisuMZ[_0x178b34(0x394)][_0x178b34(0x276)][_0x178b34(0x273)]['DataOffsetY'];const _0x3894cf=String(_0x39bd37[_0x178b34(0x488)](_0x4e5fd3['id']));this[_0x178b34(0x2fc)](_0x3894cf,_0x463b3b,_0x483eb3,_0x2b26b2,_0x178b34(0x224)),this[_0x178b34(0x225)]['fontBold']=![],this[_0x178b34(0x22c)]();},Window_Base[_0x191967(0x29e)][_0x191967(0x3a9)]=function(_0x12ef9a,_0x29eaaa,_0x7ae573,_0xa07633){const _0x3eca81=_0x191967;if(!VisuMZ[_0x3eca81(0x394)][_0x3eca81(0x276)][_0x3eca81(0x317)][_0x3eca81(0x4b3)])return;const _0x52ad4c=_0x12ef9a[_0x3eca81(0x3cd)](_0x29eaaa);if(_0x52ad4c===0x0)return;const _0x3bc300=_0x12ef9a[_0x3eca81(0x2dd)](_0x29eaaa),_0x1016d2=ImageManager[_0x3eca81(0x3d9)],_0x1bb8d9=_0x52ad4c>0x0?ColorManager[_0x3eca81(0x263)]():ColorManager[_0x3eca81(0x3e5)]();this[_0x3eca81(0x32f)](_0x1bb8d9),this[_0x3eca81(0x32b)](_0x3eca81(0x360)),this[_0x3eca81(0x225)][_0x3eca81(0x48e)]=!![],this[_0x3eca81(0x225)][_0x3eca81(0x420)]=VisuMZ[_0x3eca81(0x394)]['Settings']['Buffs']['TurnFontSize'],_0x7ae573+=VisuMZ[_0x3eca81(0x394)]['Settings'][_0x3eca81(0x317)][_0x3eca81(0x31b)],_0xa07633+=VisuMZ['SkillsStatesCore'][_0x3eca81(0x276)][_0x3eca81(0x317)]['TurnOffsetY'],this['drawText'](_0x3bc300,_0x7ae573,_0xa07633,_0x1016d2,_0x3eca81(0x45e)),this[_0x3eca81(0x225)][_0x3eca81(0x48e)]=![],this[_0x3eca81(0x22c)]();},Window_Base['prototype'][_0x191967(0x449)]=function(_0x1e35d7,_0x1e353c,_0x53a7d6,_0x713443){const _0x7b4805=_0x191967;if(!VisuMZ[_0x7b4805(0x394)]['Settings']['Buffs']['ShowData'])return;const _0xaf822a=_0x1e35d7['paramBuffRate'](_0x1e353c),_0x53c120=_0x1e35d7[_0x7b4805(0x3cd)](_0x1e353c),_0x1d3eea=ImageManager['iconWidth'],_0x36f378=ImageManager[_0x7b4805(0x3ba)]/0x2,_0xafe4ac=_0x53c120>0x0?ColorManager[_0x7b4805(0x263)]():ColorManager[_0x7b4805(0x3e5)]();this[_0x7b4805(0x32f)](_0xafe4ac),this[_0x7b4805(0x32b)]('rgba(0,\x200,\x200,\x201)'),this['contents'][_0x7b4805(0x48e)]=!![],this[_0x7b4805(0x225)]['fontSize']=VisuMZ[_0x7b4805(0x394)][_0x7b4805(0x276)][_0x7b4805(0x317)][_0x7b4805(0x2f5)],_0x53a7d6+=VisuMZ[_0x7b4805(0x394)][_0x7b4805(0x276)]['Buffs'][_0x7b4805(0x447)],_0x713443+=VisuMZ[_0x7b4805(0x394)][_0x7b4805(0x276)]['Buffs'][_0x7b4805(0x31f)];const _0x52b127=_0x7b4805(0x200)[_0x7b4805(0x2f0)](Math[_0x7b4805(0x3ff)](_0xaf822a*0x64));this[_0x7b4805(0x2fc)](_0x52b127,_0x53a7d6,_0x713443,_0x1d3eea,_0x7b4805(0x224)),this[_0x7b4805(0x225)]['fontBold']=![],this[_0x7b4805(0x22c)]();},VisuMZ[_0x191967(0x394)][_0x191967(0x4dc)]=Window_StatusBase['prototype'][_0x191967(0x393)],Window_StatusBase['prototype'][_0x191967(0x393)]=function(_0x932f5,_0x5f1ddc,_0x481090,_0x28c574){if(_0x932f5['isActor']())_0x5f1ddc=this['convertGaugeTypeSkillsStatesCore'](_0x932f5,_0x5f1ddc);this['placeExactGauge'](_0x932f5,_0x5f1ddc,_0x481090,_0x28c574);},Window_StatusBase[_0x191967(0x29e)]['placeExactGauge']=function(_0x41e168,_0x12ce05,_0x3bc431,_0x1fdb7a){const _0x2d9691=_0x191967;if([_0x2d9691(0x2b3),_0x2d9691(0x2ad)][_0x2d9691(0x398)](_0x12ce05[_0x2d9691(0x26f)]()))return;VisuMZ[_0x2d9691(0x394)]['Window_StatusBase_placeGauge'][_0x2d9691(0x344)](this,_0x41e168,_0x12ce05,_0x3bc431,_0x1fdb7a);},Window_StatusBase[_0x191967(0x29e)][_0x191967(0x2cb)]=function(_0x5e30f4,_0x1d8bdb){const _0x290ad8=_0x191967,_0x35c53a=_0x5e30f4[_0x290ad8(0x4c8)]()[_0x290ad8(0x3d2)];if(_0x1d8bdb==='hp'&&_0x35c53a[_0x290ad8(0x42d)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1d8bdb==='mp'&&_0x35c53a[_0x290ad8(0x42d)](/<REPLACE MP GAUGE:[ ](.*)>/i)){if(_0x290ad8(0x356)===_0x290ad8(0x301)){function _0x1d8516(){const _0x40ecf=_0x290ad8;this[_0x40ecf(0x3de)]&&this[_0x40ecf(0x3de)][_0x40ecf(0x4ed)]===_0x2c5bc0&&this[_0x40ecf(0x3de)]['setItem'](this[_0x40ecf(0x302)](0x0));}}else return String(RegExp['$1']);}else return _0x1d8bdb==='tp'&&_0x35c53a['match'](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x1d8bdb;}},VisuMZ[_0x191967(0x394)][_0x191967(0x1f6)]=Window_StatusBase[_0x191967(0x29e)][_0x191967(0x3fb)],Window_StatusBase['prototype']['drawActorIcons']=function(_0x5c29e3,_0x86f98d,_0x1e08a8,_0x37a9ef){const _0x5297a3=_0x191967;if(!_0x5c29e3)return;Window_Base[_0x5297a3(0x29e)][_0x5297a3(0x3fb)][_0x5297a3(0x344)](this,_0x5c29e3,_0x86f98d,_0x1e08a8,_0x37a9ef);},VisuMZ[_0x191967(0x394)][_0x191967(0x4e0)]=Window_SkillType[_0x191967(0x29e)]['initialize'],Window_SkillType[_0x191967(0x29e)][_0x191967(0x3f9)]=function(_0xfeaee3){const _0x3bc4fb=_0x191967;VisuMZ[_0x3bc4fb(0x394)]['Window_SkillType_initialize'][_0x3bc4fb(0x344)](this,_0xfeaee3),this[_0x3bc4fb(0x409)](_0xfeaee3);},Window_SkillType[_0x191967(0x29e)][_0x191967(0x409)]=function(_0x1ab4ef){const _0xe315b0=_0x191967,_0x1802bf=new Rectangle(0x0,0x0,_0x1ab4ef[_0xe315b0(0x4c9)],_0x1ab4ef[_0xe315b0(0x24f)]);this['_commandNameWindow']=new Window_Base(_0x1802bf),this['_commandNameWindow']['opacity']=0x0,this[_0xe315b0(0x24c)](this[_0xe315b0(0x40f)]),this[_0xe315b0(0x4ab)]();},Window_SkillType['prototype'][_0x191967(0x31e)]=function(){const _0x298ba1=_0x191967;Window_Command['prototype'][_0x298ba1(0x31e)][_0x298ba1(0x344)](this);if(this[_0x298ba1(0x40f)])this['updateCommandNameWindow']();},Window_SkillType['prototype'][_0x191967(0x4ab)]=function(){const _0x5ba9db=_0x191967,_0x121978=this['_commandNameWindow'];_0x121978[_0x5ba9db(0x225)][_0x5ba9db(0x46a)]();const _0x88c6de=this[_0x5ba9db(0x1f7)](this[_0x5ba9db(0x2d7)]());if(_0x88c6de===_0x5ba9db(0x4d2)&&this[_0x5ba9db(0x4a3)]()>0x0){const _0x3d3954=this[_0x5ba9db(0x3b1)](this['index']());let _0xe6b595=this['commandName'](this[_0x5ba9db(0x2d7)]());_0xe6b595=_0xe6b595['replace'](/\\I\[(\d+)\]/gi,''),_0x121978[_0x5ba9db(0x22c)](),this[_0x5ba9db(0x2dc)](_0xe6b595,_0x3d3954),this[_0x5ba9db(0x401)](_0xe6b595,_0x3d3954),this[_0x5ba9db(0x280)](_0xe6b595,_0x3d3954);}},Window_SkillType[_0x191967(0x29e)]['commandNameWindowDrawBackground']=function(_0x10d2a7,_0x539f00){},Window_SkillType[_0x191967(0x29e)][_0x191967(0x401)]=function(_0x54a8ce,_0x2bad04){const _0x41d80b=_0x191967,_0x1ed4de=this[_0x41d80b(0x40f)];_0x1ed4de[_0x41d80b(0x2fc)](_0x54a8ce,0x0,_0x2bad04['y'],_0x1ed4de[_0x41d80b(0x20c)],_0x41d80b(0x224));},Window_SkillType['prototype'][_0x191967(0x280)]=function(_0x4834f8,_0x50203b){const _0xaac655=_0x191967,_0x1f0267=this[_0xaac655(0x40f)],_0xe3d623=$gameSystem[_0xaac655(0x415)](),_0x1bb65c=_0x50203b['x']+Math[_0xaac655(0x2ce)](_0x50203b[_0xaac655(0x4c9)]/0x2)+_0xe3d623;_0x1f0267['x']=_0x1f0267['width']/-0x2+_0x1bb65c,_0x1f0267['y']=Math[_0xaac655(0x2ce)](_0x50203b[_0xaac655(0x24f)]/0x2);},Window_SkillType[_0x191967(0x29e)][_0x191967(0x469)]=function(){const _0x4e54f1=_0x191967;return Imported[_0x4e54f1(0x242)]&&Window_Command['prototype'][_0x4e54f1(0x469)]['call'](this);},Window_SkillType[_0x191967(0x29e)][_0x191967(0x444)]=function(){const _0x26c394=_0x191967;if(!this[_0x26c394(0x37c)])return;const _0x40c15d=this[_0x26c394(0x37c)][_0x26c394(0x33b)]();for(const _0x5538e9 of _0x40c15d){if(_0x26c394(0x2b0)===_0x26c394(0x2b0)){const _0x2634d9=this['makeCommandName'](_0x5538e9);this['addCommand'](_0x2634d9,'skill',!![],_0x5538e9);}else{function _0x10e714(){const _0x274414=_0x26c394;return _0x15bc82[_0x274414(0x20d)];}}}},Window_SkillType[_0x191967(0x29e)][_0x191967(0x4bc)]=function(_0x44257c){const _0x11e662=_0x191967;let _0x3d07a8=$dataSystem['skillTypes'][_0x44257c];if(_0x3d07a8[_0x11e662(0x42d)](/\\I\[(\d+)\]/i))return _0x3d07a8;if(this[_0x11e662(0x49e)]()===_0x11e662(0x3b5))return _0x3d07a8;const _0x3e2932=VisuMZ['SkillsStatesCore']['Settings'][_0x11e662(0x23a)],_0x4976ac=$dataSystem['magicSkills'][_0x11e662(0x398)](_0x44257c),_0x3764f5=_0x4976ac?_0x3e2932['IconStypeMagic']:_0x3e2932[_0x11e662(0x4b7)];return _0x11e662(0x42e)['format'](_0x3764f5,_0x3d07a8);},Window_SkillType[_0x191967(0x29e)]['itemTextAlign']=function(){const _0x19c3ac=_0x191967;return VisuMZ[_0x19c3ac(0x394)][_0x19c3ac(0x276)][_0x19c3ac(0x23a)]['CmdTextAlign'];},Window_SkillType[_0x191967(0x29e)][_0x191967(0x4c7)]=function(_0x5babe9){const _0x340921=_0x191967,_0x1317fa=this[_0x340921(0x1f7)](_0x5babe9);if(_0x1317fa===_0x340921(0x203))this[_0x340921(0x38f)](_0x5babe9);else{if(_0x1317fa==='icon'){if(_0x340921(0x418)!==_0x340921(0x397))this[_0x340921(0x264)](_0x5babe9);else{function _0x222957(){return'';}}}else Window_Command[_0x340921(0x29e)][_0x340921(0x4c7)][_0x340921(0x344)](this,_0x5babe9);}},Window_SkillType[_0x191967(0x29e)]['commandStyle']=function(){const _0x5c6e0a=_0x191967;return VisuMZ[_0x5c6e0a(0x394)]['Settings'][_0x5c6e0a(0x23a)][_0x5c6e0a(0x3ce)];},Window_SkillType[_0x191967(0x29e)][_0x191967(0x1f7)]=function(_0x2fb36d){const _0xd8fe7a=_0x191967;if(_0x2fb36d<0x0)return _0xd8fe7a(0x3b5);const _0x79faaf=this[_0xd8fe7a(0x49e)]();if(_0x79faaf!=='auto')return _0x79faaf;else{if(this[_0xd8fe7a(0x4a3)]()>0x0){if('ZxlYs'===_0xd8fe7a(0x342)){const _0x16bef1=this[_0xd8fe7a(0x36f)](_0x2fb36d);if(_0x16bef1[_0xd8fe7a(0x42d)](/\\I\[(\d+)\]/i)){const _0x1312b8=this[_0xd8fe7a(0x3b1)](_0x2fb36d),_0x274642=this[_0xd8fe7a(0x26d)](_0x16bef1)['width'];if(_0x274642<=_0x1312b8[_0xd8fe7a(0x4c9)]){if(_0xd8fe7a(0x380)!==_0xd8fe7a(0x41f))return _0xd8fe7a(0x203);else{function _0x7f5b81(){const _0x33d1e9=_0xd8fe7a;_0x5c0221['SkillsStatesCore'][_0x33d1e9(0x276)][_0x33d1e9(0x273)][_0x33d1e9(0x240)][_0x33d1e9(0x344)](this,_0x225877);}}}else{if(_0xd8fe7a(0x315)!==_0xd8fe7a(0x3a1))return'icon';else{function _0x143bae(){const _0x1969d4=_0xd8fe7a;_0x593318['prototype'][_0x1969d4(0x3d0)][_0x1969d4(0x344)](this,_0xd39dd0),this[_0x1969d4(0x262)](_0x51e221);}}}}}else{function _0x4eb24e(){const _0x5ef021=_0xd8fe7a;_0x423afe['prototype']['callUpdateHelp'][_0x5ef021(0x344)](this);if(this[_0x5ef021(0x40f)])this[_0x5ef021(0x4ab)]();}}}}return _0xd8fe7a(0x3b5);},Window_SkillType[_0x191967(0x29e)][_0x191967(0x38f)]=function(_0x746f11){const _0x2e70a9=_0x191967,_0x1757bf=this[_0x2e70a9(0x3b1)](_0x746f11),_0x637eba=this[_0x2e70a9(0x36f)](_0x746f11),_0x2db001=this[_0x2e70a9(0x26d)](_0x637eba)[_0x2e70a9(0x4c9)];this[_0x2e70a9(0x347)](this[_0x2e70a9(0x4ec)](_0x746f11));const _0x2088e7=this[_0x2e70a9(0x4bf)]();if(_0x2088e7==='right')this[_0x2e70a9(0x37a)](_0x637eba,_0x1757bf['x']+_0x1757bf['width']-_0x2db001,_0x1757bf['y'],_0x2db001);else{if(_0x2088e7==='center'){if(_0x2e70a9(0x44d)!=='nIaHX'){const _0x530b70=_0x1757bf['x']+Math[_0x2e70a9(0x2ce)]((_0x1757bf[_0x2e70a9(0x4c9)]-_0x2db001)/0x2);this[_0x2e70a9(0x37a)](_0x637eba,_0x530b70,_0x1757bf['y'],_0x2db001);}else{function _0x467a5e(){const _0x304d63=_0x2e70a9;if(!this['_actor'][_0x304d63(0x214)](_0x2b7d9b))return!![];}}}else this[_0x2e70a9(0x37a)](_0x637eba,_0x1757bf['x'],_0x1757bf['y'],_0x2db001);}},Window_SkillType[_0x191967(0x29e)][_0x191967(0x264)]=function(_0x54e918){const _0x58af8e=_0x191967;this[_0x58af8e(0x36f)](_0x54e918)[_0x58af8e(0x42d)](/\\I\[(\d+)\]/i);const _0x606244=Number(RegExp['$1'])||0x0,_0xdce5c4=this[_0x58af8e(0x3b1)](_0x54e918),_0x175354=_0xdce5c4['x']+Math[_0x58af8e(0x2ce)]((_0xdce5c4[_0x58af8e(0x4c9)]-ImageManager[_0x58af8e(0x3d9)])/0x2),_0x1b627a=_0xdce5c4['y']+(_0xdce5c4[_0x58af8e(0x24f)]-ImageManager[_0x58af8e(0x3ba)])/0x2;this[_0x58af8e(0x357)](_0x606244,_0x175354,_0x1b627a);},VisuMZ[_0x191967(0x394)][_0x191967(0x307)]=Window_SkillStatus[_0x191967(0x29e)]['refresh'],Window_SkillStatus[_0x191967(0x29e)][_0x191967(0x3bc)]=function(){const _0x157386=_0x191967;VisuMZ[_0x157386(0x394)][_0x157386(0x307)]['call'](this);if(this[_0x157386(0x37c)])this[_0x157386(0x2d1)]();},Window_SkillStatus[_0x191967(0x29e)][_0x191967(0x2d1)]=function(){const _0x23f60f=_0x191967;if(!Imported[_0x23f60f(0x242)])return;if(!Imported[_0x23f60f(0x257)])return;const _0x3fb296=this[_0x23f60f(0x495)]();let _0x272f1d=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x38ccc6=this[_0x23f60f(0x20c)]-_0x272f1d-0x2;if(_0x38ccc6>=0x12c){const _0x2c1ee7=VisuMZ[_0x23f60f(0x2c4)][_0x23f60f(0x276)]['Param'][_0x23f60f(0x402)],_0x2d6289=Math['floor'](_0x38ccc6/0x2)-0x18;let _0x3c436c=_0x272f1d,_0x4bd1ab=Math[_0x23f60f(0x2ce)]((this[_0x23f60f(0x2c7)]-Math[_0x23f60f(0x241)](_0x2c1ee7[_0x23f60f(0x2a7)]/0x2)*_0x3fb296)/0x2),_0x16109c=0x0;for(const _0x585621 of _0x2c1ee7){if(_0x23f60f(0x494)===_0x23f60f(0x2be)){function _0x43d17b(){this['drawTextEx'](_0x53cf35,_0x1de19e['x']+_0x5a9061['width']-_0x550b13,_0x5a5aa1['y'],_0x5d39bf);}}else{this[_0x23f60f(0x233)](_0x3c436c,_0x4bd1ab,_0x2d6289,_0x585621),_0x16109c++;if(_0x16109c%0x2===0x0){if(_0x23f60f(0x459)!==_0x23f60f(0x3ca))_0x3c436c=_0x272f1d,_0x4bd1ab+=_0x3fb296;else{function _0x3fddff(){const _0x2ea2a8=_0x23f60f;this['_battler']&&this[_0x2ea2a8(0x462)]?(this['bitmap'][_0x2ea2a8(0x46a)](),this[_0x2ea2a8(0x314)]()):_0x381178[_0x2ea2a8(0x394)][_0x2ea2a8(0x49b)][_0x2ea2a8(0x344)](this);}}}else{if(_0x23f60f(0x378)===_0x23f60f(0x378))_0x3c436c+=_0x2d6289+0x18;else{function _0x22d163(){_0x26dee1=_0x56b673(_0x5818f3['$1']),_0x45121e=_0x28d32d(_0x473b43['$2']);}}}}}}this[_0x23f60f(0x22c)]();},Window_SkillStatus['prototype'][_0x191967(0x233)]=function(_0x522f01,_0x5e9e24,_0x54f382,_0x5ea39d){const _0x4abb2c=_0x191967,_0x139740=this[_0x4abb2c(0x495)]();this['resetFontSettings'](),this[_0x4abb2c(0x34f)](_0x522f01,_0x5e9e24,_0x54f382,_0x5ea39d,!![]),this[_0x4abb2c(0x23b)](),this[_0x4abb2c(0x225)]['fontSize']-=0x8;const _0x42c1aa=this['_actor']['paramValueByName'](_0x5ea39d,!![]);this[_0x4abb2c(0x225)][_0x4abb2c(0x2fc)](_0x42c1aa,_0x522f01,_0x5e9e24,_0x54f382,_0x139740,_0x4abb2c(0x45e));},VisuMZ[_0x191967(0x394)]['Window_SkillList_includes']=Window_SkillList[_0x191967(0x29e)]['includes'],Window_SkillList[_0x191967(0x29e)]['includes']=function(_0x25d394){const _0x1b8021=_0x191967;return this[_0x1b8021(0x32d)](_0x25d394);},VisuMZ[_0x191967(0x394)][_0x191967(0x47e)]=Window_SkillList['prototype'][_0x191967(0x3a6)],Window_SkillList[_0x191967(0x29e)][_0x191967(0x3a6)]=function(){const _0x53f3ba=_0x191967;if(SceneManager[_0x53f3ba(0x1fd)][_0x53f3ba(0x4ed)]===Scene_Battle){if(_0x53f3ba(0x4c2)===_0x53f3ba(0x4c2))return VisuMZ[_0x53f3ba(0x394)][_0x53f3ba(0x47e)][_0x53f3ba(0x344)](this);else{function _0x5b00ca(){const _0x5d513e=_0x53f3ba,_0x2e18b3=_0x5f028e['SkillsStatesCore'][_0x5d513e(0x276)][_0x5d513e(0x273)];if(!_0x2e18b3)return;if(_0x2e18b3['ActionEndUpdate']===![])return;if(!this[_0x5d513e(0x485)])return;this[_0x5d513e(0x485)]['updateStatesActionEnd']();}}}else return VisuMZ[_0x53f3ba(0x394)][_0x53f3ba(0x276)][_0x53f3ba(0x23a)][_0x53f3ba(0x216)];},VisuMZ['SkillsStatesCore'][_0x191967(0x261)]=Window_SkillList[_0x191967(0x29e)][_0x191967(0x340)],Window_SkillList[_0x191967(0x29e)][_0x191967(0x340)]=function(_0xe7a831){const _0x22e13d=_0x191967,_0xa0a32b=this[_0x22e13d(0x37c)]!==_0xe7a831;VisuMZ[_0x22e13d(0x394)][_0x22e13d(0x261)][_0x22e13d(0x344)](this,_0xe7a831),_0xa0a32b&&(this[_0x22e13d(0x3de)]&&this[_0x22e13d(0x3de)][_0x22e13d(0x4ed)]===Window_ShopStatus&&this[_0x22e13d(0x3de)][_0x22e13d(0x21c)](this['itemAt'](0x0)));},Window_SkillList[_0x191967(0x29e)][_0x191967(0x370)]=function(_0x341dad){const _0x4c7a2f=_0x191967;if(this[_0x4c7a2f(0x43b)]===_0x341dad)return;this[_0x4c7a2f(0x43b)]=_0x341dad,this[_0x4c7a2f(0x3bc)](),this[_0x4c7a2f(0x3b7)](0x0,0x0);if(this['_statusWindow']&&this[_0x4c7a2f(0x3de)][_0x4c7a2f(0x4ed)]===Window_ShopStatus){if(_0x4c7a2f(0x371)!=='XuuyC')this[_0x4c7a2f(0x3de)][_0x4c7a2f(0x21c)](this[_0x4c7a2f(0x302)](0x0));else{function _0x15e243(){const _0x3ee366=_0x4c7a2f;if(typeof _0x17e810!==_0x3ee366(0x319))_0x1fca8a=_0x5bcfd1['id'];return this[_0x3ee366(0x323)]=this[_0x3ee366(0x323)]||{},this[_0x3ee366(0x323)][_0x175c61]===_0x22f521&&(this[_0x3ee366(0x323)][_0x182a3a]=''),this[_0x3ee366(0x323)][_0x3c2b71];}}}},Window_SkillList['prototype'][_0x191967(0x32d)]=function(_0x32c589){const _0x213781=_0x191967;if(!_0x32c589)return VisuMZ['SkillsStatesCore'][_0x213781(0x2b1)]['call'](this,_0x32c589);if(!this[_0x213781(0x21a)](_0x32c589))return![];if(!this['checkShowHideNotetags'](_0x32c589))return![];if(!this[_0x213781(0x2a6)](_0x32c589))return![];return!![];},Window_SkillList[_0x191967(0x29e)][_0x191967(0x21a)]=function(_0x415672){const _0x3e8078=_0x191967;return DataManager['getSkillTypes'](_0x415672)['includes'](this[_0x3e8078(0x43b)]);},Window_SkillList['prototype'][_0x191967(0x3a2)]=function(_0x36e863){const _0x40996d=_0x191967;if(!this[_0x40996d(0x49f)](_0x36e863))return![];if(!this['checkShowHideSwitchNotetags'](_0x36e863))return![];if(!this[_0x40996d(0x229)](_0x36e863))return![];return!![];},Window_SkillList[_0x191967(0x29e)][_0x191967(0x49f)]=function(_0x201f34){const _0xd51acf=_0x191967,_0x24d613=_0x201f34[_0xd51acf(0x3d2)];if(_0x24d613[_0xd51acf(0x42d)](/<HIDE IN BATTLE>/i)&&$gameParty[_0xd51acf(0x43a)]())return![];else{if(_0x24d613[_0xd51acf(0x42d)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0xd51acf(0x43a)]())return![];else{if(_0xd51acf(0x248)===_0xd51acf(0x381)){function _0x14460a(){const _0x341fda=_0xd51acf,_0x572780=this[_0x341fda(0x4af)](_0x53680a);return _0x572780[_0x341fda(0x2a7)];}}else return!![];}}},Window_SkillList[_0x191967(0x29e)]['checkShowHideSwitchNotetags']=function(_0x257dd3){const _0x1927e3=_0x191967,_0x337c45=_0x257dd3[_0x1927e3(0x3d2)];if(_0x337c45[_0x1927e3(0x42d)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x33b862=JSON[_0x1927e3(0x320)]('['+RegExp['$1'][_0x1927e3(0x42d)](/\d+/g)+']');for(const _0x111bb7 of _0x33b862){if(_0x1927e3(0x353)==='ncKAR'){function _0x38a702(){const _0x298605=_0x1927e3;this[_0x298605(0x32f)](_0x502038[_0x298605(0x24b)]()),this[_0x298605(0x32b)](_0x271f00[_0x298605(0x2c2)]());}}else{if(!$gameSwitches[_0x1927e3(0x37b)](_0x111bb7))return![];}}return!![];}if(_0x337c45[_0x1927e3(0x42d)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1927e3(0x204)===_0x1927e3(0x311)){function _0x3b47d6(){const _0x548124=_0x1927e3;_0x3c89eb['SkillsStatesCore'][_0x548124(0x3d1)]['call'](this,_0x76f6a7),this[_0x548124(0x483)]={};}}else{const _0x2c9ecf=JSON[_0x1927e3(0x320)]('['+RegExp['$1'][_0x1927e3(0x42d)](/\d+/g)+']');for(const _0x48a3c7 of _0x2c9ecf){if(!$gameSwitches[_0x1927e3(0x37b)](_0x48a3c7))return![];}return!![];}}if(_0x337c45[_0x1927e3(0x42d)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5ef9aa=JSON[_0x1927e3(0x320)]('['+RegExp['$1'][_0x1927e3(0x42d)](/\d+/g)+']');for(const _0x161cd0 of _0x5ef9aa){if($gameSwitches[_0x1927e3(0x37b)](_0x161cd0))return!![];}return![];}if(_0x337c45[_0x1927e3(0x42d)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x53a314=JSON['parse']('['+RegExp['$1'][_0x1927e3(0x42d)](/\d+/g)+']');for(const _0x2c6825 of _0x53a314){if(!$gameSwitches[_0x1927e3(0x37b)](_0x2c6825))return!![];}return![];}if(_0x337c45[_0x1927e3(0x42d)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1927e3(0x3cb)!==_0x1927e3(0x3cb)){function _0x498518(){const _0xb97224=_0x1927e3;let _0xd5a32f=[this[_0xb97224(0x235)](),this[_0xb97224(0x4c8)]()];_0xd5a32f=_0xd5a32f[_0xb97224(0x3aa)](this[_0xb97224(0x1f0)]()[_0xb97224(0x3b2)](_0x3f3a2d=>_0x3f3a2d));for(const _0x3d7219 of this['_skills']){const _0x52e500=_0x2cf605[_0x3d7219];if(_0x52e500)_0xd5a32f['push'](_0x52e500);}return _0xd5a32f;}}else{const _0x3e8cf7=JSON[_0x1927e3(0x320)]('['+RegExp['$1'][_0x1927e3(0x42d)](/\d+/g)+']');for(const _0x47bccd of _0x3e8cf7){if(!$gameSwitches[_0x1927e3(0x37b)](_0x47bccd))return!![];}return![];}}if(_0x337c45[_0x1927e3(0x42d)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x280bed=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x50d901 of _0x280bed){if($gameSwitches[_0x1927e3(0x37b)](_0x50d901))return![];}return!![];}return!![];},Window_SkillList['prototype'][_0x191967(0x229)]=function(_0x1d415f){const _0x224ce4=_0x191967,_0x41fc39=_0x1d415f[_0x224ce4(0x3d2)];if(_0x41fc39[_0x224ce4(0x42d)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2bc893=JSON[_0x224ce4(0x320)]('['+RegExp['$1'][_0x224ce4(0x42d)](/\d+/g)+']');for(const _0x4299a9 of _0x2bc893){if(!this[_0x224ce4(0x37c)][_0x224ce4(0x214)](_0x4299a9))return![];}return!![];}else{if(_0x41fc39[_0x224ce4(0x42d)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2c23eb=RegExp['$1'][_0x224ce4(0x3ee)](',');for(const _0x5e9794 of _0x2c23eb){if(_0x224ce4(0x2ac)!==_0x224ce4(0x2ac)){function _0x1b6a6e(){const _0x1f274a=_0x224ce4;this[_0x1f274a(0x346)][_0x244c0a]--;}}else{const _0x5720e6=DataManager[_0x224ce4(0x3ec)](_0x5e9794);if(!_0x5720e6)continue;if(!this[_0x224ce4(0x37c)]['isLearnedSkill'](_0x5720e6))return![];}}return!![];}}if(_0x41fc39['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('yLMzw'==='RfQFC'){function _0x7637e7(){_0x53ada2=_0x1dd931(_0x577de4['$1']),_0x2bec26=_0x433393(_0xbc0c04['$2']);}}else{const _0x228124=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x282f3d of _0x228124){if(_0x224ce4(0x42a)===_0x224ce4(0x450)){function _0x48bf67(){const _0x35c59b=_0x224ce4;this[_0x35c59b(0x283)](),_0x2c9aba[_0x35c59b(0x394)][_0x35c59b(0x28a)][_0x35c59b(0x344)](this);}}else{if(!this[_0x224ce4(0x37c)][_0x224ce4(0x214)](_0x282f3d))return![];}}return!![];}}else{if(_0x41fc39[_0x224ce4(0x42d)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('Rsmqm'!==_0x224ce4(0x375)){const _0x4226d2=RegExp['$1'][_0x224ce4(0x3ee)](',');for(const _0x547a21 of _0x4226d2){if('kaqIu'!=='hkPaA'){const _0x5edbeb=DataManager[_0x224ce4(0x3ec)](_0x547a21);if(!_0x5edbeb)continue;if(!this['_actor'][_0x224ce4(0x214)](_0x5edbeb))return![];}else{function _0xdd7b6(){const _0x106a16=_0x224ce4;_0x28aa5d['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x1af7ab=_0x460e12['$1'];if(_0x1af7ab['match'](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x4b2cc6=_0x214947[_0x106a16(0x320)]('['+_0x22204a['$1'][_0x106a16(0x42d)](/\d+/g)+']');this[_0x106a16(0x483)][_0x106a16(0x406)]=this['_cache'][_0x106a16(0x406)][_0x106a16(0x3aa)](_0x4b2cc6);}else{const _0x56848e=_0x1af7ab[_0x106a16(0x3ee)](',');for(const _0x2887ba of _0x56848e){const _0x302cd8=_0x105013['getStateIdWithName'](_0x2887ba);if(_0x302cd8)this[_0x106a16(0x483)][_0x106a16(0x406)][_0x106a16(0x437)](_0x302cd8);}}}}}return!![];}else{function _0xb66c83(){const _0x7135d6=_0x224ce4;this['_stateRetainType']='',this[_0x7135d6(0x33d)]={},this['_stateDisplay']={},this['_stateOrigin']={};}}}}if(_0x41fc39[_0x224ce4(0x42d)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x224ce4(0x426)!=='kyPYA'){const _0x1ea675=JSON['parse']('['+RegExp['$1'][_0x224ce4(0x42d)](/\d+/g)+']');for(const _0x27925e of _0x1ea675){if(_0x224ce4(0x361)!==_0x224ce4(0x298)){if(this[_0x224ce4(0x37c)][_0x224ce4(0x214)](_0x27925e))return!![];}else{function _0x2019d6(){const _0x3d4ca7=_0x224ce4;return this[_0x3d4ca7(0x4ce)](_0x3b2628)>0x0;}}}return![];}else{function _0x331485(){const _0x18491c=_0x224ce4,_0x55588c=_0x2a4fce['parse']('['+_0x34894a['$1']['match'](/\d+/g)+']');for(const _0x4324a3 of _0x55588c){if(!this[_0x18491c(0x37c)][_0x18491c(0x214)](_0x4324a3))return![];}return!![];}}}else{if(_0x41fc39[_0x224ce4(0x42d)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x224ce4(0x3bb)===_0x224ce4(0x3bb)){const _0x321290=RegExp['$1'][_0x224ce4(0x3ee)](',');for(const _0x184012 of _0x321290){const _0x32ea52=DataManager['getSkillIdWithName'](_0x184012);if(!_0x32ea52)continue;if(this[_0x224ce4(0x37c)][_0x224ce4(0x214)](_0x32ea52))return!![];}return![];}else{function _0x3ed2ac(){const _0x2000b9=_0x224ce4;_0x2e76eb[_0x2000b9(0x29e)]['onRemoveState'][_0x2000b9(0x344)](this,_0x13f028),this[_0x2000b9(0x442)](_0x549d66),this['onEraseStateGlobalJS'](_0xc02d);}}}}if(_0x41fc39[_0x224ce4(0x42d)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x224ce4(0x4cf)!==_0x224ce4(0x47f)){const _0x5db6c9=JSON['parse']('['+RegExp['$1'][_0x224ce4(0x42d)](/\d+/g)+']');for(const _0x86a488 of _0x5db6c9){if(!this['_actor'][_0x224ce4(0x214)](_0x86a488))return!![];}return![];}else{function _0x23a8d4(){const _0x7e6e02=_0x224ce4;_0x5eb25a[_0x7e6e02(0x29e)]['onEraseDebuff'][_0x7e6e02(0x344)](this,_0x2e2f98),this['onEraseDebuffGlobalJS'](_0x70b0ed);}}}else{if(_0x41fc39[_0x224ce4(0x42d)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x494487=RegExp['$1'][_0x224ce4(0x3ee)](',');for(const _0x3334d3 of _0x494487){if(_0x224ce4(0x260)===_0x224ce4(0x474)){function _0x545aac(){const _0x5c16b6=_0x224ce4;this[_0x5c16b6(0x294)][_0x5c16b6(0x46a)](),this['redrawSkillsStatesCore']();}}else{const _0x4906f1=DataManager['getSkillIdWithName'](_0x3334d3);if(!_0x4906f1)continue;if(!this[_0x224ce4(0x37c)]['isLearnedSkill'](_0x4906f1))return!![];}}return![];}}if(_0x41fc39[_0x224ce4(0x42d)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('PDqLh'!==_0x224ce4(0x2d4)){function _0x1a2b88(){const _0x802bf2=_0x224ce4;return _0x28cf9f[_0x802bf2(0x394)][_0x802bf2(0x276)][_0x802bf2(0x273)][_0x802bf2(0x492)];}}else{const _0x500dab=JSON[_0x224ce4(0x320)]('['+RegExp['$1'][_0x224ce4(0x42d)](/\d+/g)+']');for(const _0x185b88 of _0x500dab){if(_0x224ce4(0x4c4)===_0x224ce4(0x4c4)){if(!this[_0x224ce4(0x37c)][_0x224ce4(0x214)](_0x185b88))return!![];}else{function _0x44a7b4(){return!![];}}}return![];}}else{if(_0x41fc39[_0x224ce4(0x42d)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2d6717=RegExp['$1'][_0x224ce4(0x3ee)](',');for(const _0x2c208a of _0x2d6717){const _0x4e906e=DataManager[_0x224ce4(0x3ec)](_0x2c208a);if(!_0x4e906e)continue;if(!this[_0x224ce4(0x37c)][_0x224ce4(0x214)](_0x4e906e))return!![];}return![];}}if(_0x41fc39[_0x224ce4(0x42d)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x224ce4(0x38e)!==_0x224ce4(0x38e)){function _0x20dea2(){const _0x45c1c1=_0x224ce4,_0xdc7c1c=_0x19eff2[_0x45c1c1(0x394)][_0x45c1c1(0x276)][_0x45c1c1(0x41e)][_0x45c1c1(0x2e3)];this[_0x45c1c1(0x483)][_0x45c1c1(0x406)]=this[_0x45c1c1(0x483)][_0x45c1c1(0x406)][_0x45c1c1(0x3aa)](_0xdc7c1c);}}else{const _0x38b77a=JSON[_0x224ce4(0x320)]('['+RegExp['$1'][_0x224ce4(0x42d)](/\d+/g)+']');for(const _0x5caa36 of _0x38b77a){if(_0x224ce4(0x42c)===_0x224ce4(0x220)){function _0x315263(){const _0x85db75=_0x224ce4;let _0x8ed130=0x0,_0x4ee6bf=0x0;if(_0x367fba[_0x85db75(0x42d)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x8ed130=_0x354361(_0x15a7f4['$1']),_0x4ee6bf=_0x1b5750(_0x36d66c['$2']);else _0x16213b[_0x85db75(0x42d)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x8ed130=_0x23a6cc['getStateIdWithName'](_0x2441b6['$1']),_0x4ee6bf=_0x25ac3a(_0x1b2d72['$2']));_0x476cce[_0x85db75(0x3af)](_0x8ed130,_0x4ee6bf),this[_0x85db75(0x443)](_0x2f630d);}}else{if(this[_0x224ce4(0x37c)][_0x224ce4(0x214)](_0x5caa36))return![];}}return!![];}}else{if(_0x41fc39[_0x224ce4(0x42d)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('NraQe'!==_0x224ce4(0x2f6)){const _0x589a44=RegExp['$1'][_0x224ce4(0x3ee)](',');for(const _0x51b618 of _0x589a44){const _0x156684=DataManager[_0x224ce4(0x3ec)](_0x51b618);if(!_0x156684)continue;if(this[_0x224ce4(0x37c)][_0x224ce4(0x214)](_0x156684))return![];}return!![];}else{function _0x4eacd8(){const _0x29d20b=_0x224ce4,_0x575d47=_0x45b59e[_0x29d20b(0x35b)][_0x29d20b(0x344)](this,_0x159d4d);_0x3fde11[_0x29d20b(0x318)][_0x29d20b(0x344)](this,_0x12a38,_0x575d47);}}}}if(_0x41fc39[_0x224ce4(0x42d)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1655cb=JSON[_0x224ce4(0x320)]('['+RegExp['$1'][_0x224ce4(0x42d)](/\d+/g)+']');for(const _0x18ee9e of _0x1655cb){if(!this[_0x224ce4(0x37c)][_0x224ce4(0x391)](_0x18ee9e))return![];}return!![];}else{if(_0x41fc39[_0x224ce4(0x42d)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xc6a468=RegExp['$1'][_0x224ce4(0x3ee)](',');for(const _0xc8b107 of _0xc6a468){if(_0x224ce4(0x369)==='wEGoS'){function _0x45caa0(){const _0x15d3d3=_0x224ce4,_0x25ba24=this[_0x15d3d3(0x482)][_0x44e014];this[_0x15d3d3(0x230)](_0x50a648);if(_0x25ba24>0x0)this[_0x15d3d3(0x2e4)](_0x43ff44);if(_0x25ba24<0x0)this['onExpireDebuff'](_0x44bce9);}}else{const _0x2f9465=DataManager[_0x224ce4(0x3ec)](_0xc8b107);if(!_0x2f9465)continue;if(!this[_0x224ce4(0x37c)][_0x224ce4(0x391)](_0x2f9465))return![];}}return!![];}}if(_0x41fc39['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29d05c=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2a855d of _0x29d05c){if(!this[_0x224ce4(0x37c)][_0x224ce4(0x391)](_0x2a855d))return![];}return!![];}else{if(_0x41fc39['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x267140=RegExp['$1']['split'](',');for(const _0x45bfc3 of _0x267140){const _0x103002=DataManager[_0x224ce4(0x3ec)](_0x45bfc3);if(!_0x103002)continue;if(!this[_0x224ce4(0x37c)][_0x224ce4(0x391)](_0x103002))return![];}return!![];}}if(_0x41fc39[_0x224ce4(0x42d)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x224ce4(0x275)!==_0x224ce4(0x306)){const _0x4876eb=JSON[_0x224ce4(0x320)]('['+RegExp['$1'][_0x224ce4(0x42d)](/\d+/g)+']');for(const _0x5c32ca of _0x4876eb){if('WuMsm'===_0x224ce4(0x274)){function _0x56a760(){const _0x30b764=_0x224ce4;if(!_0x375587[_0x30b764(0x37b)](_0x201202))return!![];}}else{if(this['_actor'][_0x224ce4(0x391)](_0x5c32ca))return!![];}}return![];}else{function _0x3e875c(){const _0x54c607=_0x224ce4;_0x394905=_0x3aa355[_0x54c607(0x3aa)](_0x9aaa0[_0x54c607(0x473)]);}}}else{if(_0x41fc39[_0x224ce4(0x42d)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5aa311=RegExp['$1'][_0x224ce4(0x3ee)](',');for(const _0x2ec87d of _0x5aa311){if(_0x224ce4(0x498)===_0x224ce4(0x498)){const _0x2d6bb7=DataManager['getSkillIdWithName'](_0x2ec87d);if(!_0x2d6bb7)continue;if(this['_actor']['hasSkill'](_0x2d6bb7))return!![];}else{function _0x41697e(){const _0x56f272=_0x224ce4;return _0x18626d=_0xc248a0(_0x5c29f3),_0x366862[_0x56f272(0x42d)](/#(.*)/i)?'#%1'[_0x56f272(0x2f0)](_0x5ed06b(_0x3ec7bc['$1'])):this['textColor'](_0x169c54(_0x24b9b9));}}}return![];}}if(_0x41fc39['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1f3f44=JSON[_0x224ce4(0x320)]('['+RegExp['$1'][_0x224ce4(0x42d)](/\d+/g)+']');for(const _0x1aa3c2 of _0x1f3f44){if(!this[_0x224ce4(0x37c)]['hasSkill'](_0x1aa3c2))return!![];}return![];}else{if(_0x41fc39[_0x224ce4(0x42d)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xee26a7=RegExp['$1']['split'](',');for(const _0x50b7aa of _0xee26a7){const _0x22fd08=DataManager[_0x224ce4(0x3ec)](_0x50b7aa);if(!_0x22fd08)continue;if(!this['_actor'][_0x224ce4(0x391)](_0x22fd08))return!![];}return![];}}if(_0x41fc39[_0x224ce4(0x42d)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c3668=JSON['parse']('['+RegExp['$1'][_0x224ce4(0x42d)](/\d+/g)+']');for(const _0x4ea037 of _0x2c3668){if('qBRGU'!==_0x224ce4(0x4b8)){function _0x44a29e(){const _0x362857=_0x224ce4;if(_0x3de3b0[_0x362857(0x2bc)]())_0x24dd4e['log'](_0x3351fb);}}else{if(!this[_0x224ce4(0x37c)]['hasSkill'](_0x4ea037))return!![];}}return![];}else{if(_0x41fc39[_0x224ce4(0x42d)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x224ce4(0x27f)!==_0x224ce4(0x452)){const _0x43fdf3=RegExp['$1'][_0x224ce4(0x3ee)](',');for(const _0x3cc9ff of _0x43fdf3){if(_0x224ce4(0x4aa)===_0x224ce4(0x33e)){function _0x2cfc2a(){const _0x420d46=_0x224ce4;return _0x17ebd8[_0x420d46(0x29e)][_0x420d46(0x376)]['call'](this);}}else{const _0x3104f7=DataManager[_0x224ce4(0x3ec)](_0x3cc9ff);if(!_0x3104f7)continue;if(!this[_0x224ce4(0x37c)][_0x224ce4(0x391)](_0x3104f7))return!![];}}return![];}else{function _0x1e183a(){const _0x57b892=_0x224ce4;this[_0x57b892(0x20e)]='';}}}}if(_0x41fc39[_0x224ce4(0x42d)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x436fe7=JSON[_0x224ce4(0x320)]('['+RegExp['$1'][_0x224ce4(0x42d)](/\d+/g)+']');for(const _0x21e337 of _0x436fe7){if(this['_actor']['hasSkill'](_0x21e337))return![];}return!![];}else{if(_0x41fc39[_0x224ce4(0x42d)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('HWOAQ'==='DmwMI'){function _0x2d42d2(){const _0x19e593=_0x224ce4;if(this[_0x19e593(0x3c7)](_0x3d2b87))return!![];return _0x14fd39['SkillsStatesCore'][_0x19e593(0x3e6)][_0x19e593(0x344)](this,_0x3688fe);}}else{const _0x415b0b=RegExp['$1']['split'](',');for(const _0xe33ab7 of _0x415b0b){const _0x151172=DataManager[_0x224ce4(0x3ec)](_0xe33ab7);if(!_0x151172)continue;if(this[_0x224ce4(0x37c)]['hasSkill'](_0x151172))return![];}return!![];}}}return!![];},Window_SkillList[_0x191967(0x29e)][_0x191967(0x2a6)]=function(_0x307d92){const _0x5f217f=_0x191967,_0x1cc0b8=_0x307d92[_0x5f217f(0x3d2)],_0x1c8baf=VisuMZ[_0x5f217f(0x394)][_0x5f217f(0x217)];return _0x1c8baf[_0x307d92['id']]?_0x1c8baf[_0x307d92['id']]['call'](this,_0x307d92):!![];},VisuMZ['SkillsStatesCore'][_0x191967(0x2a4)]=Window_SkillList[_0x191967(0x29e)][_0x191967(0x4c7)],Window_SkillList[_0x191967(0x29e)][_0x191967(0x4c7)]=function(_0x116b12){const _0x544a68=_0x191967,_0x435fc1=this[_0x544a68(0x302)](_0x116b12),_0x10eeb8=_0x435fc1['name'];if(_0x435fc1)this['alterSkillName'](_0x435fc1);VisuMZ['SkillsStatesCore'][_0x544a68(0x2a4)][_0x544a68(0x344)](this,_0x116b12);if(_0x435fc1)_0x435fc1[_0x544a68(0x213)]=_0x10eeb8;},Window_SkillList['prototype']['alterSkillName']=function(_0x2720e6){const _0x1c4d58=_0x191967;if(_0x2720e6&&_0x2720e6[_0x1c4d58(0x3d2)][_0x1c4d58(0x42d)](/<LIST NAME:[ ](.*)>/i)){_0x2720e6[_0x1c4d58(0x213)]=String(RegExp['$1'])[_0x1c4d58(0x464)]();for(;;){if(_0x2720e6[_0x1c4d58(0x213)][_0x1c4d58(0x42d)](/\\V\[(\d+)\]/gi))_0x2720e6['name']=_0x2720e6[_0x1c4d58(0x213)]['replace'](/\\V\[(\d+)\]/gi,(_0x27ded6,_0x1f5041)=>$gameVariables[_0x1c4d58(0x37b)](parseInt(_0x1f5041)));else{if(_0x1c4d58(0x425)!==_0x1c4d58(0x35a))break;else{function _0x1557f7(){const _0x508144=_0x1c4d58,_0x57dbdb=_0x285aa4[_0x508144(0x320)]('['+_0x5f50a9['$1'][_0x508144(0x42d)](/\d+/g)+']');for(const _0x42137d of _0x57dbdb){if(!_0x31b6cc['value'](_0x42137d))return![];}return!![];}}}}}},Window_SkillList['prototype'][_0x191967(0x4e2)]=function(_0x2734c1,_0x2c6ca6,_0x3dd4ba,_0x22f461){const _0x14ec90=_0x191967;Window_Base[_0x14ec90(0x29e)][_0x14ec90(0x4e2)][_0x14ec90(0x344)](this,this[_0x14ec90(0x37c)],_0x2734c1,_0x2c6ca6,_0x3dd4ba,_0x22f461);},Window_SkillList[_0x191967(0x29e)][_0x191967(0x29f)]=function(_0xb086e7){const _0x4c319f=_0x191967;this[_0x4c319f(0x3de)]=_0xb086e7,this[_0x4c319f(0x31e)]();},VisuMZ[_0x191967(0x394)][_0x191967(0x25b)]=Window_SkillList[_0x191967(0x29e)][_0x191967(0x30b)],Window_SkillList['prototype'][_0x191967(0x30b)]=function(){const _0x5978fa=_0x191967;VisuMZ[_0x5978fa(0x394)]['Window_SkillList_updateHelp'][_0x5978fa(0x344)](this);if(this[_0x5978fa(0x3de)]&&this[_0x5978fa(0x3de)][_0x5978fa(0x4ed)]===Window_ShopStatus){if('ypdIi'===_0x5978fa(0x4a2))this[_0x5978fa(0x3de)][_0x5978fa(0x21c)](this[_0x5978fa(0x2db)]());else{function _0x207a87(){const _0x475e89=_0x5978fa,_0xcfaf4a=_0x579fed[_0x475e89(0x3d2)];if(_0x4af259===_0x475e89(0x4c5)&&_0xcfaf4a['match'](/<NO DEATH CLEAR>/i))return![];if(_0x770259==='recover\x20all'&&_0xcfaf4a[_0x475e89(0x42d)](/<NO RECOVER ALL CLEAR>/i))return![];}}}};