import React from 'react';

import { useTheme } from '@storybook/react-native-theming';
import { Keyboard, Text, View } from 'react-native';
import { useStoryContext } from '../../hooks';
import { ErrorBoundary } from './ErrorBoundary';

/**
 * This is a handler for `onStartShouldSetResponder`, which dismisses the
 * keyboard as a side effect but then responds with `false` to the responder
 * system, so as not to start actually handling the touch.
 *
 * The objective here is to dismiss the keyboard when the story view is tapped,
 * but in a way that won't interfere with presses or swipes. Using a
 * `Touchable...` component as a wrapper will start to handle the touch, which
 * will swallow swipe gestures that should have gone on to a child view, such
 * as `ScrollView`.
 */
function dismissOnStartResponder() {
  Keyboard.dismiss();

  return false;
}

const StoryView = () => {
  const context = useStoryContext();

  const id = context?.id;

  const { backgroundColor } = useTheme();

  if (context && context.unboundStoryFn) {
    const { unboundStoryFn: StoryComponent } = context;

    return (
      <View
        style={{ flex: 1, backgroundColor }}
        key={id}
        testID={id}
        onStartShouldSetResponder={dismissOnStartResponder}
      >
        <ErrorBoundary>{StoryComponent && <StoryComponent {...context} />}</ErrorBoundary>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Please open the sidebar and select a story to preview.</Text>
    </View>
  );
};

export default React.memo(StoryView);
