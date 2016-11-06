## MarkdownMaid 
Visual Studio Code Markdown Extension with mermaid
---

### Usage
command: MarkdownMaid

### thanks
* marked
* mermaid

## Features
---
### subgraph
```mermaid
graph TB
	subgraph one
	a1-->a2
	end
	subgraph two
	b1-->b2
	end
	subgraph three
	c1-->c2
	end
	c1-->a2

	style a2 fill:#f9f,stroke:#333,stroke-width:4px;
	style b2 fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
```

---
### sequenceDiagram
```mermaid
sequenceDiagram
	Alice->>Bob: Hello Bob, how are you?
	alt is sick
			Bob->>Alice: Not so good :(
	else is well
			Bob->>Alice: Feeling fresh like a daisy
	end
	opt Extra response
			Bob->>Alice: Thanks for asking
	end
```

---
### gantt
```mermaid
gantt
	dateFormat  YYYY-MM-DD
	title gantt diagram mermaid

	section A section
	Completed task            :done,    des1, 2014-01-06,2014-01-08
	Active task               :active,  des2, 2014-01-09, 3d
	Future task               :         des3, after des2, 5d
	Future task2              :         des4, after des3, 5d

	section Critical tasks
	Completed task in the critical line :crit, done, 2014-01-06,24h
	Implement parser and jison          :crit, done, after des1, 2d
	Create tests for parser             :crit, active, 3d
	Future task in critical line        :crit, 5d
	Create tests for renderer           :2d
	Add to mermaid                      :1d

	section Documentation
	Describe gantt syntax               :active, a1, after des1, 3d
	Add gantt diagram to demo page      :after a1  , 20h
	Add another diagram to demo page    :doc1, after a1  , 48h

	section Last section
	Describe gantt syntax               :after doc1, 3d
	Add gantt diagram to demo page      : 20h
	Add another diagram to demo page    : 48h
```
---
### Release Notes
* 0.1.0: preview markdown with mermaid