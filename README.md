# Android Pattern Lock Generator

A Jupyter notebook project that generates and visualizes all possible Android pattern lock combinations on a 3x3 grid (9 dots).

## Features

- **Complete Pattern Generation**: Generates all valid pattern lock combinations (length 4-9)
- **Pattern Validation**: Implements Android's pattern lock rules (cannot skip unvisited dots)
- **Visualization**: Beautiful visualizations of individual patterns and pattern groups
- **Statistics**: Provides distribution analysis and summary statistics
- **Export**: Saves all patterns to JSON files for further analysis

## Requirements

Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Usage

1. Open the Jupyter notebook:
   ```bash
   jupyter notebook android_pattern_lock_generator.ipynb
   ```

2. Run all cells to:
   - Generate all possible patterns
   - Visualize sample patterns
   - View statistics and distributions
   - Export patterns to JSON files

3. Use the `show_pattern()` function to visualize any specific pattern:
   ```python
   show_pattern([1, 2, 5, 8, 9])
   ```

## Pattern Lock Rules

- Minimum pattern length: 4 dots
- Maximum pattern length: 9 dots (all dots)
- Cannot visit the same dot twice
- Cannot skip a dot that's between two dots unless it's already been visited

## Output Files

- `all_patterns.json`: Contains all generated patterns
- `pattern_summary.json`: Contains summary statistics

## Example

The notebook will generate approximately 389,112 unique patterns and visualize them with:
- Individual pattern visualizations
- Grouped visualizations by pattern length
- Statistical distributions
- Example patterns (shortest and longest)