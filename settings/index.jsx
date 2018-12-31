const color_set = [
  { color: "#FFFFFF" },
  { color: "#A0A0A0" },
  { color: "#505050" },
  { color: "#303030" },
  { color: "#000000" },

  { color: "#E4FA3C" },
  { color: "#FFCC33" },
  { color: "#FC6B3A" },
  { color: "#F83C40" },
  { color: "#F80070" },
  { color: "#F83478" },
  { color: "#A51E7C" },
  { color: "#D828B8" },
  { color: "#BD4EFC" },
  { color: "#5B4CFF" },
  { color: "#8080FF" },
  { color: "#7090B5" },
  { color: "#BCD8F8" },
  { color: "#3182DE" },
  { color: "#14D3F5" },
  { color: "#3BF7DE" },
  { color: "#00A629" },
  { color: "#5BE37D" },
  { color: "#B8FC68" },
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
          props.settingsStorage.setItem("color_line", JSON.stringify("#642a17"));
          props.settingsStorage.setItem("color_steps", JSON.stringify("#bcd8f8"));
          props.settingsStorage.setItem("color_cals", JSON.stringify("#7898f8"));
          props.settingsStorage.setItem("color_active", JSON.stringify("#d893ff"));
          props.settingsStorage.setItem("color_heart", JSON.stringify("#f83c40"));
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