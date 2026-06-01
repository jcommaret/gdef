import React from "react";
import { Text, TextStyle, View } from "react-native";

type Segment =
  | { kind: "text"; content: string }
  | { kind: "sup"; content: string }
  | { kind: "italic"; content: string };

function parseSegments(text: string): Segment[] {
  const segments: Segment[] = [];
  // Match [sup]...[/sup], [i]...[/i], or any other standalone [tag] to discard
  const re = /\[sup\](.*?)\[\/sup\]|\[i\](.*?)\[\/i\]|\[[^\]]+\]/gs;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      segments.push({ kind: "text", content: text.slice(last, match.index) });
    }
    if (match[1] !== undefined) {
      segments.push({ kind: "sup", content: match[1] });
    } else if (match[2] !== undefined) {
      segments.push({ kind: "italic", content: match[2] });
    }
    // unknown tags: silently discarded
    last = re.lastIndex;
  }

  if (last < text.length) {
    segments.push({ kind: "text", content: text.slice(last) });
  }

  return segments;
}

interface FormattedTextProps {
  text: string;
  style: TextStyle | TextStyle[];
}

/**
 * Renders a string that may contain [sup]...[/sup] and [i]...[/i] tags.
 * Other bracketed tags (lexicographic annotations) are silently discarded.
 * When superscript is present the component switches to a flex-row View so
 * that alignSelf: 'flex-start' actually raises the text.
 */
export function FormattedText({ text, style }: FormattedTextProps) {
  if (!/\[/.test(text)) {
    return <Text style={style}>{text}</Text>;
  }

  const segments = parseSegments(text);
  const hasSup = segments.some((s) => s.kind === "sup");
  const styles = Array.isArray(style) ? style : [style];

  if (!hasSup) {
    // No superscript: stay inline, just handle italics
    return (
      <Text style={style}>
        {segments.map((seg, i) =>
          seg.kind === "italic" ? (
            <Text key={i} style={{ fontStyle: "italic" }}>
              {seg.content}
            </Text>
          ) : (
            <React.Fragment key={i}>{seg.content}</React.Fragment>
          ),
        )}
      </Text>
    );
  }

  // Superscript present: use flex-row so alignSelf works
  return (
    <View
      style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-end" }}
    >
      {segments.map((seg, i) => {
        if (seg.kind === "sup") {
          return (
            <Text
              key={i}
              style={[...styles, { fontSize: 10, alignSelf: "flex-start" }]}
            >
              {seg.content}
            </Text>
          );
        }
        if (seg.kind === "italic") {
          return (
            <Text key={i} style={[...styles, { fontStyle: "italic" }]}>
              {seg.content}
            </Text>
          );
        }
        return (
          <Text key={i} style={style}>
            {seg.content}
          </Text>
        );
      })}
    </View>
  );
}
export default FormattedText;
