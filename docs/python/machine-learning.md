# Python Notes

## Pandas
#### How to create an empty DataFrame and append rows & columns to it in Pandas?
Method #1: Create a complete empty DataFrame without any column name or indices and then appending columns one by one to it.

```python
# create an Empty DataFrame object
df = pd.DataFrame()
# append columns to an empty DataFrame
df['Name'] = ['Ankit', 'Ankita', 'Yashvardhan']
df['Articles'] = [97, 600, 200]
```

Method #2: Create an empty DataFrame with columns name only then appending rows one by one to it using append() method.

```python
# object With column names only
df = pd.DataFrame(columns = ['Name', 'Articles', 'Improved'])
  
# append rows to an empty DataFrame
df = df.append({'Name' : 'Ankit', 'Articles' : 97, 'Improved' : 2200}, 
                ignore_index = True)

```
Method #3: Create an empty DataFrame with a column name and indices and then appending rows one by one to it using loc[] method.

```python
df = pd.DataFrame(columns = ['Name', 'Articles', 'Improved'], 
                   index = ['a', 'b', 'c'])
  
# adding rows to an empty 
# dataframe at existing index
df.loc['a'] = ['Ankita', 50, 100]
```

## Numpy
