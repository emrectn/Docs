# Tmux Notes

## TmuxConf Notes

- Create ~/.tmux.conf


````bash
# Make mouse useful in copy mode
set -g mouse on

# Allow xterm titles in terminal window, terminal scrolling with scrollbar, and setting overrides of C-Up, C-Down, C-Left, C-Right
set -g terminal-overrides "xterm*:XT:smcup@:rmcup@:kUP5=\eOA:kDN5=\eOB:kLFT5=\eOD:kRIT5=\eOC"

# Scroll History
set -g history-limit 30000

# Set ability to capture on start and restore on exit window data when running an application
set -g alternate-screen on

# Lower escape timing from 500ms to 50ms for quicker response to scroll-buffer access.
set -s escape-time 50
````



