import React from 'react';
import { CogIcon, DuplicateIcon, majorScale, minorScale, Pane, Text, TextInput, toaster } from 'evergreen-ui';
import './TopNav.css';

const NODE_ENV = process.env;

export default ({ code }) => {
  const host = NODE_ENV === 'production' ?
    'https://standup.rocks' : 'http://localhost:3001';

  const copyUrl = () => {
    // Taken from https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    const copyText = document.getElementById("url-input");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
    copyText.blur();

    toaster.success('URL copied!', { duration: 1 });
  };

  return (
    <Pane
      className="top-nav-container"
      width="100%"
      flexShrink={1}
      display="flex"
      padding={majorScale(2)}
      alignItems="center"
      justifyContent="center"
    >
      <div className="quick-copy" onClick={copyUrl}>
        <Pane className="url" paddingX={majorScale(2)} paddingY={minorScale(1)}>
          <TextInput
            id="url-input"
            readOnly
            className="url-input"
            value={`${host}/${code}`}
          />
        </Pane>
        <Pane className="cta" paddingX={majorScale(2)} paddingY={minorScale(1)}>
          <DuplicateIcon size={10} marginRight={majorScale(1)} />
          <Text color="inherit">
            Copy link
          </Text>
        </Pane>
      </div>

      {/* TODO Implement team settings */}
      {false && (
        <div className="team-settings">
          <CogIcon color="muted" size={20} marginRight={majorScale(1)} />
        </div>
      )}
    </Pane>
  );
};
