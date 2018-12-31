const color_set = [
  // Color pallete from:
  // https://flatuicolors.com/palette/au
  // https://flatuicolors.com/palette/us
  { color: "#f5f5f5" },
  { color: "#A0A0A0" },
  { color: "#505050" },
  { color: "#303030" },
  { color: "#000000" },

  { color: "#badc58" },
  { color: "#6ab04c" },
  { color: "#55efc4" },
  { color: "#00b894" },
  { color: "#81ecec" },
  { color: "#00cec9" },
  { color: "#7ed6df" },
  { color: "#22a6b3" },
  { color: "#74b9ff" },
  { color: "#0984e3" },
  { color: "#a29bfe" },
  { color: "#6c5ce7" },

  { color: "#30336b" },
  { color: "#130f40" },
  { color: "#ffeaa7" },
  { color: "#fdcb6e" },
  { color: "#ffbe76" },
  { color: "#f0932b" },
  { color: "#fab1a0" },
  { color: "#e17055" },
  { color: "#ff7675" },
  { color: "#d63031" },
  { color: "#fd79a8" },
  { color: "#e84393" },
];

const options = [
  ["Line Color", "color_line"],
  ["Step Counter Color", "color_steps"],
  ["Calorie Counter Color", "color_cals"],
  ["Activity Time Color", "color_active"],
  ["Heart Rate Color", "color_heart"],
];

function mySettings(props) {
  return (
    <Page>
      <Section title="Options">
        <Toggle settingsKey="fahrenheit" label="Use Fahrenheit" />
        <Button list label="Reset Colors to Default" onClick={function() {
          props.settingsStorage.setItem("color_line", "{}");
          props.settingsStorage.setItem("color_steps", "{}");
          props.settingsStorage.setItem("color_cals", "{}");
          props.settingsStorage.setItem("color_active", "{}");
          props.settingsStorage.setItem("color_heart", "{}");
        }}
      />
      </Section>
      {options.map(([title, settingsKey]) =>
        <Section title={title}>
          <ColorSelect settingsKey={settingsKey} colors={color_set} />
        </Section>
      )}
    </Page>
  );
}

registerSettingsPage(mySettings);